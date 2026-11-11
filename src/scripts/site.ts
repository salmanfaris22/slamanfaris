// Home page behaviour: ambient canvas, layer tabs, project filter, copy email, active nav.
import { track } from './track';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initAurora() {
  const canvas = document.getElementById('aurora') as HTMLCanvasElement | null;
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  const blobs = [
    { x: .35, y: .4, r: .5, drift: .05, speed: .00021, phase: 0, rgb: '239, 68, 68', alpha: .14 },
    { x: .7, y: .45, r: .42, drift: .06, speed: .00017, phase: 2, rgb: '185, 28, 28', alpha: .1 },
    { x: .5, y: .8, r: .48, drift: .04, speed: .00013, phase: 4, rgb: '255, 255, 255', alpha: .03 },
  ];
  const pointer = { x: .5, y: .5, tx: .5, ty: .5 };
  let width = 0;
  let height = 0;
  let frame = 0;
  let running = false;

  const resize = () => {
    width = canvas.width = canvas.clientWidth;
    height = canvas.height = canvas.clientHeight;
  };

  const paint = (time: number) => {
    pointer.x += (pointer.tx - pointer.x) * .04;
    pointer.y += (pointer.ty - pointer.y) * .04;
    ctx.clearRect(0, 0, width, height);
    const shortSide = Math.min(width, height);
    for (const blob of blobs) {
      const px = (blob.x + Math.sin(time * blob.speed + blob.phase) * blob.drift + (pointer.x - .5) * .06) * width;
      const py = (blob.y + Math.cos(time * blob.speed + blob.phase) * blob.drift + (pointer.y - .5) * .06) * height;
      const radius = blob.r * shortSide;
      const fill = ctx.createRadialGradient(px, py, 0, px, py, radius);
      fill.addColorStop(0, `rgba(${blob.rgb}, ${blob.alpha})`);
      fill.addColorStop(1, 'transparent');
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    // Slow concentric rings that spread from the centre of the hero.
    const cx = width * .5 + (pointer.x - .5) * 20;
    const cy = height * .45 + (pointer.y - .5) * 20;
    const start = (time * .024) % 120;
    ctx.lineWidth = 1;
    for (let ring = 0; ring < 4; ring += 1) {
      const radius = start + ring * 140;
      const alpha = .04 * Math.max(0, 1 - radius / (Math.max(width, height) * .7));
      if (alpha < .005) continue;
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const loop = (time: number) => {
    if (!running) return;
    paint(time);
    frame = requestAnimationFrame(loop);
  };
  const play = () => {
    if (running || reduceMotion()) return;
    running = true;
    frame = requestAnimationFrame(loop);
  };
  const pause = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  resize();
  paint(0);
  window.addEventListener('resize', () => {
    resize();
    if (!running) paint(0);
  }, { passive: true });
  window.addEventListener('pointermove', (event) => {
    pointer.tx = event.clientX / width;
    pointer.ty = event.clientY / height;
  }, { passive: true });
  document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));

  const hero = document.getElementById('home');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()), { threshold: .02 }).observe(hero);
  } else {
    play();
  }
}

function initLayerTabs() {
  const tabs = [...document.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  if (!tabs.length) return;

  const select = (next: HTMLButtonElement, focus = false) => {
    for (const tab of tabs) {
      const active = tab === next;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls') || '')?.classList.toggle('is-active', active);
    }
    if (focus) next.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (event) => {
      const moves: Record<string, number> = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: tabs.length - 1 };
      if (!(event.key in moves)) return;
      event.preventDefault();
      select(tabs[(moves[event.key] + tabs.length) % tabs.length], true);
    });
  });
}

function initFilters() {
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('.filter-btn')];
  const cards = [...document.querySelectorAll<HTMLElement>('.bento-card[data-category]')];
  const status = document.getElementById('matrix-status');
  if (!buttons.length) return;

  for (const button of buttons) {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'All work';
      let shown = 0;
      for (const item of buttons) item.setAttribute('aria-pressed', String(item === button));
      for (const card of cards) {
        const match = filter === 'All work' || card.dataset.category === filter;
        card.hidden = !match;
        if (match) shown += 1;
      }
      if (status) status.textContent = `${shown} projects in ${filter}`;
    });
  }
}

function initCopyEmail() {
  const toast = document.getElementById('toast');
  const message = document.getElementById('toast-text');
  let timer = 0;

  const show = (text: string) => {
    if (message) message.textContent = text;
    toast?.classList.add('is-on');
    clearTimeout(timer);
    timer = window.setTimeout(() => toast?.classList.remove('is-on'), 3200);
  };

  const fallbackCopy = (text: string) => {
    const field = document.createElement('textarea');
    field.value = text;
    field.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(field);
    field.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    }
    field.remove();
    return copied;
  };

  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
    button.addEventListener('click', async () => {
      const text = button.dataset.copy || '';
      let copied = false;
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        copied = fallbackCopy(text);
      }
      show(copied ? `Copied to clipboard: ${text}` : `Email: ${text}`);
      if (copied) track('email_copy');
    });
  }
}

function initNavSpy() {
  const links = new Map<string, HTMLAnchorElement>();
  for (const link of document.querySelectorAll<HTMLAnchorElement>('.dock-link[href^="#"]')) links.set(link.hash.slice(1), link);
  if (!links.size || !('IntersectionObserver' in window)) return;

  // A thin band across the middle of the screen, so tall sections still register.
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const [id, link] of links) {
        const active = id === entry.target.id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-45% 0px -50% 0px' });

  for (const section of document.querySelectorAll('main section[id]')) observer.observe(section);
}

initAurora();
initLayerTabs();
initFilters();
initCopyEmail();
initNavSpy();
