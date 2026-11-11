// Page-build intro. The finished page paints first, then a crew of labelled cursors rebuilds it,
// box by box and line by line. It works on the real DOM, so everything stays live while it runs.
// It plays once per tab and never runs for reduced motion, deep links, save-data or crawlers.
// Force it with ?intro=1, turn it off with ?intro=off.

const SEEN_KEY = 'intro:played';

const CREW = [
  { name: 'Editor', color: '#ff7262' },
  { name: 'Frontend', color: '#1abcfe' },
  { name: 'Colorist', color: '#ffc700' },
  { name: 'Backend', color: '#0acf83' },
  { name: 'Motion', color: '#a259ff' },
  { name: 'SEO', color: '#ff5fa2' },
  { name: 'Designer', color: '#00b5ce' },
  { name: 'AI', color: '#b6f23c' },
  { name: 'Marketer', color: '#ff8a00' },
  { name: 'Director', color: '#8d9bff' },
];

// Rectangles are drawn; text is typed. Order on the page decides the build order.
const DRAWN = '.dock, .hero-wordmark, .hero-name, .hero-role, .hero-actions .btn, .hero-stats, .portrait, .portrait-panel, .portrait-img, .portrait-badge, .hud-card, .hud-tags .tech-tag, .divider, .card, .metric, .chip, .tech-tag, .tag, .layer-tab, .layer-pane, .filter-btn, .email-box, .social-pill';
const TYPED = '.hero-script, .hero-desc, .section-tag, .section-title, .section-desc, .about-text, .quote, .step-title, .step-text, .flagship-meta, .flagship-title, .flagship-desc, .explorer-title, .explorer-sub, .card-title, .card-text, .bento-title, .bento-text, .contact-title, .contact-sub, .contact-meta';

type Kind = 'draw' | 'type';
type State = 'pending' | 'claimed' | 'done';
interface Line { top: number; bottom: number; left: number; right: number; }
interface Layer { el: HTMLElement; kind: Kind; parent: Layer | null; state: State; x: number; y: number; w: number; h: number; lines: Line[]; length: number; }
interface Agent { el: HTMLElement; box: HTMLElement; size: HTMLElement; color: string; x: number; y: number; fromX: number; fromY: number; toX: number; toY: number; start: number; duration: number; phase: 'idle' | 'fly' | 'work' | 'leave'; layer: Layer | null; }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const easeInOut = (t: number) => (t < .5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const make = <K extends keyof HTMLElementTagNameMap>(tag: K, className = '', html = '') => {
  const node = document.createElement(tag);
  node.className = className;
  node.innerHTML = html;
  return node;
};

function shouldRun(params: URLSearchParams) {
  const flag = params.get('intro');
  if (flag === 'off') return false;
  if (flag === '1') return true;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (location.hash || window.scrollY > 40 || document.visibilityState !== 'visible' || connection?.saveData) return false;
  if (navigator.webdriver || /bot|crawl|spider|slurp|lighthouse|headless|pagespeed|gtmetrix|preview/i.test(navigator.userAgent)) return false;
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return false;
  }
}

function collectLayers() {
  const nodes = new Map<HTMLElement, Kind>();
  for (const el of document.querySelectorAll<HTMLElement>(DRAWN)) nodes.set(el, 'draw');
  for (const el of document.querySelectorAll<HTMLElement>(TYPED)) if (!nodes.has(el)) nodes.set(el, 'type');

  const layers: Layer[] = [];
  const byElement = new Map<HTMLElement, Layer>();
  for (const [el, kind] of nodes) {
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    const layer: Layer = { el, kind, parent: null, state: 'pending', x: rect.left + window.scrollX, y: rect.top + window.scrollY, w: rect.width, h: rect.height, lines: [], length: el.textContent?.length ?? 0 };
    layers.push(layer);
    byElement.set(el, layer);
  }
  for (const layer of layers) {
    let up = layer.el.parentElement;
    while (up && !byElement.has(up)) up = up.parentElement;
    layer.parent = up ? byElement.get(up) ?? null : null;
  }
  // Top to bottom, then left to right, with parents before their children.
  return layers.sort((a, b) => (Math.abs(a.y - b.y) > 6 ? a.y - b.y : a.x - b.x));
}

function measureLines(layer: Layer) {
  const range = document.createRange();
  range.selectNodeContents(layer.el);
  const box = layer.el.getBoundingClientRect();
  const lines: Line[] = [];
  for (const rect of range.getClientRects()) {
    if (rect.width < 1) continue;
    const top = rect.top - box.top;
    const bottom = rect.bottom - box.top;
    const left = rect.left - box.left;
    const right = rect.right - box.left;
    const line = lines.find((item) => Math.abs(item.top - top) < rect.height * .6);
    if (line) {
      line.left = Math.min(line.left, left);
      line.right = Math.max(line.right, right);
      line.bottom = Math.max(line.bottom, bottom);
    } else {
      lines.push({ top, bottom, left, right });
    }
  }
  layer.lines = lines.length ? lines : [{ top: 0, bottom: layer.h, left: 0, right: layer.w }];
}

/** Clip for a block of text revealed up to progress p, plus where the caret sits. */
function typedClip(layer: Layer, p: number) {
  const total = layer.lines.reduce((sum, line) => sum + (line.right - line.left), 0);
  let remaining = p * total;
  let index = 0;
  while (index < layer.lines.length - 1 && remaining > layer.lines[index].right - layer.lines[index].left) {
    remaining -= layer.lines[index].right - layer.lines[index].left;
    index += 1;
  }
  const line = layer.lines[index];
  const caret = line.left + remaining;
  const top = Math.floor(line.top) - 2;
  const bottom = Math.ceil(line.bottom) + 4;
  const clip = index === 0
    ? `polygon(-4px ${top}px, ${caret}px ${top}px, ${caret}px ${bottom}px, -4px ${bottom}px)`
    : `polygon(-4px -4px, 100% -4px, 100% ${top}px, ${caret}px ${top}px, ${caret}px ${bottom}px, -4px ${bottom}px)`;
  return { clip, caretX: layer.x + caret, caretY: layer.y + line.top };
}

function buildCursor(name: string, color: string) {
  const el = make('div', 'bi-cursor', `
    <svg class="bi-g-arrow" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M2 2l6.8 17 2.6-7.3L19 9.2 2 2z" fill="${color}" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>
    <svg class="bi-g-draw" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1v18M1 10h18" stroke="${color}" stroke-width="2.4"/></svg>
    <svg class="bi-g-type" width="14" height="22" viewBox="0 0 14 22" aria-hidden="true"><path d="M2 1.5h3.5L7 3l1.5-1.5H12M7 3v16M2 20.5h3.5L7 19l1.5 1.5H12" fill="none" stroke="${color}" stroke-width="2.2"/></svg>
    <span class="bi-name" style="background:${color}">${name}</span>`);
  el.dataset.mode = 'arrow';
  return el;
}

async function run() {
  const docHeight = document.documentElement.scrollHeight;
  const small = window.innerWidth < 720;
  const layers = collectLayers();
  if (!layers.length) return;

  const stage = make('div', 'bi-stage');
  stage.style.height = `${docHeight}px`;
  stage.setAttribute('aria-hidden', 'true');

  const crew = CREW.slice(0, small ? 6 : CREW.length);
  const pill = make('div', 'bi-pill');
  pill.innerHTML = `
    <span class="bi-crew" aria-hidden="true">${crew.slice(0, 5).map((member) => `<i style="background:${member.color}"></i>`).join('')}</span>
    <span class="bi-sep"></span>
    <span class="bi-count" data-count>Scanning page…</span>
    <span class="bi-track" aria-hidden="true"><i data-progress></i></span>
    <button type="button" class="bi-btn" data-tour aria-pressed="true">Touring</button>
    <button type="button" class="bi-btn" data-speed aria-label="Build speed">1×</button>
    <button type="button" class="bi-btn" data-skip aria-label="Skip the build animation">✕</button>`;
  const countEl = pill.querySelector<HTMLElement>('[data-count]')!;
  const progressEl = pill.querySelector<HTMLElement>('[data-progress]')!;
  const tourBtn = pill.querySelector<HTMLButtonElement>('[data-tour]')!;
  const speedBtn = pill.querySelector<HTMLButtonElement>('[data-speed]')!;

  const veil = make('div', 'bi-veil');
  const scanline = make('div', 'bi-scanline');
  const tile = make('div', 'bi-tile', 'SF');
  tile.setAttribute('aria-hidden', 'true');
  document.body.append(veil, scanline, tile, stage, pill);

  let speed = 1;
  let touring = true;
  let finished = false;
  let building = false;
  let doneCount = 0;
  let scrollCarry = window.scrollY;
  let last = performance.now();
  let raf = 0;

  const agents: Agent[] = crew.map((member) => {
    const el = buildCursor(member.name, member.color);
    const box = make('div', 'bi-box', '<i></i><i></i><i></i><i></i><b></b>');
    stage.append(box, el);
    const fromLeft = Math.random() < .5;
    const x = fromLeft ? -30 : window.innerWidth + 30;
    const y = Math.random() * window.innerHeight;
    return { el, box, size: box.querySelector('b')!, color: member.color, x, y, fromX: x, fromY: y, toX: x, toY: y, start: 0, duration: 1, phase: 'idle', layer: null };
  });

  const place = (agent: Agent) => { agent.el.style.transform = `translate3d(${agent.x}px, ${agent.y}px, 0)`; };
  agents.forEach(place);

  const show = (layer: Layer) => {
    layer.el.classList.remove('bi-pending');
    layer.el.style.clipPath = '';
    if (layer.state !== 'done') {
      layer.state = 'done';
      doneCount += 1;
    }
  };

  const updateCount = () => {
    countEl.innerHTML = `<strong>${crew.length}</strong> agents &nbsp;<strong>${doneCount}</strong> / ${layers.length} layers`;
    progressEl.style.width = `${(doneCount / layers.length) * 100}%`;
  };

  const cleanUp = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('wheel', stopTour);
    window.removeEventListener('touchstart', stopTour);
    window.removeEventListener('resize', skip);
    document.removeEventListener('click', onAnchor);
    clearTimeout(watchdog);
  };

  const remember = () => {
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* private mode: it simply plays again */ }
  };

  /** Show everything now. Always safe to call. */
  function skip() {
    if (finished) return;
    finished = true;
    cleanUp();
    layers.forEach(show);
    veil.remove();
    scanline.remove();
    tile.remove();
    stage.remove();
    pill.remove();
    remember();
  }

  const complete = () => {
    if (finished) return;
    finished = true;
    cleanUp();
    remember();
    countEl.innerHTML = `Built <strong>${layers.length}</strong> layers`;
    progressEl.style.width = '100%';
    for (const agent of agents) agent.el.classList.add('is-off');
    setTimeout(() => pill.classList.add('is-off'), 1200);
    setTimeout(() => { stage.remove(); pill.remove(); }, 1700);
  };

  function stopTour() {
    touring = false;
    tourBtn.setAttribute('aria-pressed', 'false');
    tourBtn.textContent = 'Tour';
  }

  function onKey(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Tab') skip();
    else if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) stopTour();
  }

  function onAnchor(event: MouseEvent) {
    if ((event.target as HTMLElement | null)?.closest('a[href^="#"]')) stopTour();
  }

  window.addEventListener('keydown', onKey);
  window.addEventListener('wheel', stopTour, { passive: true });
  window.addEventListener('touchstart', stopTour, { passive: true });
  window.addEventListener('resize', skip);
  document.addEventListener('click', onAnchor);
  const watchdog = setTimeout(skip, 120000);

  pill.querySelector('[data-skip]')!.addEventListener('click', skip);
  speedBtn.addEventListener('click', () => {
    speed = speed === 1 ? 2 : speed === 2 ? 4 : 1;
    speedBtn.textContent = `${speed}×`;
  });
  tourBtn.addEventListener('click', () => {
    touring = !touring;
    tourBtn.setAttribute('aria-pressed', String(touring));
    tourBtn.textContent = touring ? 'Touring' : 'Tour';
    scrollCarry = window.scrollY;
  });

  const claim = (agent: Agent, viewTop: number, viewBottom: number) => {
    for (const layer of layers) {
      if (layer.state !== 'pending') continue;
      if (layer.y > viewBottom) return false;
      if (layer.parent && layer.parent.state !== 'done') continue;
      if (layer.y + layer.h < viewTop) { show(layer); continue; }
      layer.state = 'claimed';
      if (layer.kind === 'type') measureLines(layer);
      agent.layer = layer;
      agent.fromX = agent.x;
      agent.fromY = agent.y;
      agent.toX = layer.x;
      agent.toY = layer.y;
      const distance = Math.hypot(agent.toX - agent.x, agent.toY - agent.y);
      agent.duration = clamp(distance * .55, 120, 480);
      agent.start = performance.now();
      agent.phase = 'fly';
      agent.el.dataset.mode = 'arrow';
      return true;
    }
    return false;
  };

  const beginWork = (agent: Agent, now: number) => {
    const layer = agent.layer!;
    agent.phase = 'work';
    agent.start = now;
    agent.fromX = layer.x;
    agent.fromY = layer.y;
    agent.el.dataset.mode = layer.kind;
    layer.el.classList.remove('bi-pending');
    agent.box.classList.add('is-on');
    agent.box.classList.toggle('is-text', layer.kind === 'type');
    agent.box.style.transform = `translate(${layer.x}px, ${layer.y}px)`;
    if (layer.kind === 'type') {
      agent.box.style.width = `${layer.w}px`;
      agent.box.style.height = `${layer.h}px`;
      agent.duration = clamp(layer.length * 11, 240, 900);
    } else {
      agent.duration = clamp(Math.sqrt(layer.w * layer.h) * 1.1, 200, 620);
    }
  };

  const work = (agent: Agent, p: number) => {
    const layer = agent.layer!;
    if (layer.kind === 'type') {
      const { clip, caretX, caretY } = typedClip(layer, p);
      layer.el.style.clipPath = clip;
      agent.x = caretX;
      agent.y = caretY + 8;
    } else {
      const eased = easeInOut(p);
      const width = layer.w * eased;
      const height = layer.h * eased;
      layer.el.style.clipPath = `inset(0 ${(1 - eased) * 100}% ${(1 - eased) * 100}% 0)`;
      agent.box.style.width = `${width}px`;
      agent.box.style.height = `${height}px`;
      agent.size.textContent = `${Math.round(width)} × ${Math.round(height)}`;
      agent.x = layer.x + width;
      agent.y = layer.y + height;
    }
  };

  /** Anything the visitor has scrolled past must be visible at once, even mid-build. */
  const flushAbove = (viewTop: number) => {
    let changed = false;
    for (const layer of layers) {
      if (layer.state === 'done' || layer.y + layer.h >= viewTop) continue;
      const agent = agents.find((item) => item.layer === layer);
      if (agent) {
        agent.layer = null;
        agent.phase = 'idle';
        agent.el.dataset.mode = 'arrow';
        agent.box.classList.remove('is-on');
      }
      show(layer);
      changed = true;
    }
    if (changed) updateCount();
  };

  const tick = (now: number) => {
    if (finished) return;
    const delta = Math.min(now - last, 64);
    last = now;
    const viewTop = window.scrollY;
    const viewBottom = viewTop + window.innerHeight * 1.04;
    let busy = 0;

    if (building) flushAbove(viewTop);

    for (const agent of agents) {
      if (agent.phase === 'idle') {
        if (building && claim(agent, viewTop, viewBottom)) busy += 1;
        continue;
      }
      busy += 1;
      const p = clamp(((now - agent.start) * speed) / agent.duration, 0, 1);
      if (agent.phase === 'fly') {
        const eased = easeInOut(p);
        agent.x = agent.fromX + (agent.toX - agent.fromX) * eased;
        agent.y = agent.fromY + (agent.toY - agent.fromY) * eased;
        if (p >= 1) {
          if (agent.layer) beginWork(agent, now);
          else agent.phase = 'idle';
        }
      } else if (agent.phase === 'work') {
        work(agent, p);
        if (p >= 1) {
          show(agent.layer!);
          agent.box.classList.remove('is-on');
          agent.layer = null;
          agent.phase = 'idle';
          agent.el.dataset.mode = 'arrow';
          updateCount();
        }
      }
      place(agent);
    }

    if (doneCount >= layers.length) {
      complete();
      return;
    }

    // The tour moves on only when the crew has caught up with what is on screen.
    if (touring && building) {
      if (busy <= crew.length / 2) {
        const pendingInView = layers.some((layer) => layer.state === 'pending' && layer.y < viewBottom - 40);
        if (!pendingInView) {
          scrollCarry += (delta / 1000) * 240 * speed;
          const max = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo({ top: Math.min(scrollCarry, max), behavior: 'instant' });
        }
      }
    } else {
      scrollCarry = window.scrollY;
    }
    raf = requestAnimationFrame(tick);
  };

  // Sweep a scan line down the finished page, then start from a blank stage.
  requestAnimationFrame(() => {
    veil.classList.add('is-down');
    scanline.classList.add('is-down');
  });
  await wait(540);
  if (finished) return;
  for (const layer of layers) layer.el.classList.add('bi-pending');
  scanline.classList.add('is-gone');
  tile.classList.add('is-on');
  // The crew gathers around the logo while the page is scanned.
  agents.forEach((agent, index) => {
    const angle = (index / agents.length) * Math.PI * 2;
    const radius = 110 + Math.random() * 130;
    agent.toX = window.innerWidth / 2 + Math.cos(angle) * radius * 1.5;
    agent.toY = window.innerHeight / 2 + Math.sin(angle) * radius;
    agent.fromX = agent.x;
    agent.fromY = agent.y;
    agent.start = performance.now();
    agent.duration = 640;
    agent.phase = 'fly';
  });
  last = performance.now();
  raf = requestAnimationFrame(tick);
  await wait(860);
  if (finished) return;
  tile.classList.remove('is-on');
  veil.classList.add('is-gone');
  building = true;
  updateCount();
  await wait(420);
  if (finished) return;
  veil.remove();
  scanline.remove();
  tile.remove();
}

function boot() {
  const params = new URLSearchParams(location.search);
  if (params.get('intro') === '1') history.replaceState(null, '', location.pathname);

  document.querySelector('[data-replay-build]')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    location.href = '/?intro=1';
  });

  if (!shouldRun(params)) return;

  const start = async () => {
    await Promise.race([document.fonts.ready, wait(1200)]);
    await wait(320);
    if (document.visibilityState !== 'visible') return;
    if (params.get('intro') !== '1' && (window.scrollY > 40 || location.hash)) return;
    try {
      await run();
    } catch {
      for (const el of document.querySelectorAll('.bi-pending')) el.classList.remove('bi-pending');
      for (const el of document.querySelectorAll('.bi-veil, .bi-scanline, .bi-tile, .bi-stage, .bi-pill')) el.remove();
    }
  };

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

boot();
