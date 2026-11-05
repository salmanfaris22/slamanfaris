/** Progressive, network-independent sculpture. Keep Three.js out of the initial page bundle. */
export function initSculpture() {
  const host = document.querySelector<HTMLElement>('[data-sculpture]');
  const canvas = host?.querySelector<HTMLCanvasElement>('[data-sculpture-canvas]');
  if (!host || !canvas || host.dataset.initialized) return;
  host.dataset.initialized = 'true';
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compactViewport = window.matchMedia('(max-width: 767px)');
  // Phones and motion-sensitive visitors receive the finished vector artwork.
  if (motionPreference.matches || compactViewport.matches) return;
  let disposed = false;
  let cleanup: (() => void) | undefined;
  const onPageHide = () => { disposed = true; cleanup?.(); };
  window.addEventListener('pagehide', onPageHide, { once: true });

  const start = async () => {
    if (disposed || motionPreference.matches) return;
    try {
      const THREE = await import('three');
      const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
      if (disposed || motionPreference.matches) return;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.55;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(37, 1, .1, 50);
      camera.position.set(0, 0, 8.8);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const environment = pmrem.fromScene(room, .04);
      scene.environment = environment.texture;
      scene.environmentIntensity = 1.2;
      room.dispose();
      pmrem.dispose();
      const group = new THREE.Group();
      scene.add(group);
      const geometry = new THREE.TorusKnotGeometry(1.42, .47, 240, 40, 2, 3);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xe00808, metalness: .94, roughness: .21,
        clearcoat: .5, clearcoatRoughness: .16, envMapIntensity: 1,
      });
      const knot = new THREE.Mesh(geometry, material);
      group.add(knot);
      const key = new THREE.DirectionalLight(0xffdada, 3);
      key.position.set(-4, 6, 5);
      scene.add(key);
      const edge = new THREE.DirectionalLight(0xff4a4a, 3.5);
      edge.position.set(4, -2, -3);
      scene.add(edge);
      const fill = new THREE.DirectionalLight(0xffffff, 1.4);
      fill.position.set(-5, -4, 2);
      scene.add(fill);
      group.rotation.set(.3, -.5, -.35);
      let active = true;
      let frame = 0;
      let elapsed = 0;
      let previous = 0;
      let targetX = 0;
      let targetY = 0;
      let pointerX = 0;
      let pointerY = 0;
      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.position.z = camera.aspect < .9 ? 10 : 8.8;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      const tick = (time: number) => {
        if (disposed || !active || document.hidden || motionPreference.matches) return;
        const delta = previous ? Math.min((time - previous) / 1000, .04) : 0;
        previous = time;
        elapsed += delta;
        pointerX += (targetX - pointerX) * .035;
        pointerY += (targetY - pointerY) * .035;
        group.rotation.y = -.5 + elapsed * .075 + pointerX * .24;
        group.rotation.x = .3 + Math.sin(elapsed * .27) * .12 + pointerY * .15;
        group.rotation.z = -.35 + Math.sin(elapsed * .19) * .07;
        group.position.y = Math.sin(elapsed * .7) * .07;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(tick);
      };
      const resume = () => {
        cancelAnimationFrame(frame);
        previous = 0;
        if (active && !document.hidden && !motionPreference.matches && !disposed) frame = requestAnimationFrame(tick);
      };
      const intersection = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; resume(); }, { rootMargin: '80px' });
      intersection.observe(host);
      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return;
        const bounds = host.getBoundingClientRect();
        targetX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
        targetY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      };
      const onPointerLeave = () => { targetX = 0; targetY = 0; };
      const onMotionChange = () => {
        if (motionPreference.matches) {
          cancelAnimationFrame(frame);
          host.classList.remove('sculpture--ready');
        } else { host.classList.add('sculpture--ready'); resume(); }
      };
      const onContextLost = (event: Event) => {
        event.preventDefault();
        cancelAnimationFrame(frame);
        active = false;
        host.classList.remove('sculpture--ready');
      };
      host.addEventListener('pointermove', onPointerMove);
      host.addEventListener('pointerleave', onPointerLeave);
      canvas.addEventListener('webglcontextlost', onContextLost);
      document.addEventListener('visibilitychange', resume);
      motionPreference.addEventListener('change', onMotionChange);
      resize();
      renderer.render(scene, camera);
      host.classList.add('sculpture--ready');
      resume();
      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        intersection.disconnect();
        host.removeEventListener('pointermove', onPointerMove);
        host.removeEventListener('pointerleave', onPointerLeave);
        canvas.removeEventListener('webglcontextlost', onContextLost);
        document.removeEventListener('visibilitychange', resume);
        motionPreference.removeEventListener('change', onMotionChange);
        geometry.dispose(); material.dispose(); environment.dispose(); renderer.dispose();
        host.classList.remove('sculpture--ready');
      };
    } catch {
      // The SVG is a complete artwork, including when WebGL or an import is unavailable.
      host.classList.remove('sculpture--ready');
    }
  };
  // Leave the critical typography and navigation free to paint first.
  if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(() => { void start(); }, { timeout: 1400 });
  else window.setTimeout(() => { void start(); }, 250);
}
