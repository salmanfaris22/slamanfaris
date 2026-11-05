import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
const media = gsap.matchMedia();
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
let lenis: Lenis | undefined;
let removeTicker: (() => void) | undefined;
const cleanup: Array<() => void> = [];

// Enhancement only: the complete page remains visible without JavaScript.
const intro = document.querySelector<HTMLElement>('#intro');
function enter() {
  if (!reduce.matches) gsap.from('.name-line > span', { yPercent: 110, duration: 1.05, stagger: .12, ease: 'power4.out', clearProps: 'transform' });
}
if (intro && !reduce.matches) {
  let returning = false;
  try { returning = localStorage.getItem('sf-visited') === '1'; localStorage.setItem('sf-visited','1'); } catch { /* Private browsing is supported. */ }
  intro.classList.add('visible');
  const progress = { value: 0 };
  const duration = returning ? .55 : 1.65;
  document.querySelectorAll<SVGPathElement>('.intro-path').forEach(path => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  });
  const timeline = gsap.timeline({ onComplete: () => intro.remove() });
  timeline.to('.intro-path', { strokeDashoffset: 0, duration: duration * .7, stagger: .12, ease: 'power2.inOut' }, 0)
    .from('.intro-head', { scale: 0, transformOrigin: 'center', duration: .35, ease: 'back.out' }, .12)
    .from('.intro-title > *', { opacity: 0, y: 15, stagger: .07, duration: .35 }, .15)
    .to(progress, { value: 100, duration, ease: 'power2.inOut', onUpdate: () => {
      const label = document.querySelector('#intro-progress');
      if (label) label.textContent = `${Math.round(progress.value).toString().padStart(3,'0')}%`;
    } }, 0)
    .to(intro, { yPercent: -100, duration: .65, ease: 'power4.inOut', onStart: enter }, duration + .12);
  cleanup.push(() => timeline.kill());
  // Never leave the visitor behind an intro if the tab suspends mid-animation.
  const timeout = window.setTimeout(() => { intro.remove(); }, 4500);
  cleanup.push(() => clearTimeout(timeout));
} else { intro?.remove(); enter(); }

media.add('(prefers-reduced-motion: no-preference)', () => {
  lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  removeTicker = () => gsap.ticker.remove(tick);
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, { y: 35, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 91%', once: true }, clearProps: 'transform,opacity' });
  });
  gsap.fromTo('[data-word]', { opacity: .22 }, { opacity: 1, stagger: .18, ease: 'none', scrollTrigger: { trigger: '.statement-text', start: 'top 80%', end: 'bottom 48%', scrub: .5 } });
  gsap.to('.band-track', { xPercent: -18, ease: 'none', scrollTrigger: { trigger: '.discipline-band', start: 'top bottom', end: 'bottom top', scrub: .7 } });
  gsap.to('.statement-symbol', { rotation: 135, ease: 'none', scrollTrigger: { trigger: '.statement-section', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  document.querySelectorAll<HTMLElement>('.stat-number[data-count]').forEach(el => {
    const value = { number: 0 };
    gsap.to(value, { number: Number(el.dataset.count), duration: 1.2, snap: { number: 1 }, scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => { el.textContent = value.number.toString().padStart(2,'0'); } });
  });
  document.querySelectorAll<HTMLDetailsElement>('.skill-discipline').forEach(el => el.addEventListener('toggle', refresh));
  return () => {
    removeTicker?.(); lenis?.destroy(); lenis = undefined;
    document.querySelectorAll<HTMLDetailsElement>('.skill-discipline').forEach(el => el.removeEventListener('toggle', refresh));
  };
});
function refresh() { ScrollTrigger.refresh(); }

media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
  gsap.to('.tag-motion', { y: -30, rotate: -1, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.to('.tag-code', { y: 40, rotate: 2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.to('.process-orbit', { rotation: 200, scale: .8, ease: 'none', scrollTrigger: { trigger: '.process-layout', start: 'top 25%', end: 'bottom 70%', scrub: .7 } });
  const visual = document.querySelector<HTMLElement>('.process-visual');
  const layout = document.querySelector<HTMLElement>('.process-layout');
  if (visual && layout) {
    gsap.set(visual, { position: 'relative', top: 0 });
    ScrollTrigger.create({ trigger: layout, start: 'top 110px', end: () => `+=${Math.max(0,layout.offsetHeight-visual.offsetHeight)}`, pin: visual, pinSpacing: false, invalidateOnRefresh: true });
  }
});

media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
  const steps = gsap.utils.toArray<HTMLElement>('.process-step');
  const setStep = (index: number) => {
    steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
    const number = document.querySelector('.process-number');
    if (number) number.textContent = `0${index+1}`;
  };
  steps.forEach((step, index) => ScrollTrigger.create({ trigger: step, start: 'top 60%', end: 'bottom 60%', onEnter: () => setStep(index), onEnterBack: () => setStep(index) }));
  return () => { setStep(0); };
});

const onModal = (event: Event) => { if ((event as CustomEvent<boolean>).detail) lenis?.stop(); else lenis?.start(); };
window.addEventListener('portfolio:modal', onModal);
cleanup.push(() => window.removeEventListener('portfolio:modal', onModal));

const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('#mobile-nav');
const setMenu = (open: boolean) => {
  menu?.setAttribute('aria-expanded', String(open)); menu?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  nav?.classList.toggle('open', open); if (nav) nav.inert = !open;
};
menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); } });
document.addEventListener('click',event=>{if(menu?.getAttribute('aria-expanded')==='true' && !nav?.contains(event.target as Node) && !menu.contains(event.target as Node))setMenu(false);});

const copy = document.querySelector<HTMLButtonElement>('.copy-email');
copy?.addEventListener('click', async () => {
  const email = copy.dataset.email ?? '';
  const status = document.querySelector('.copy-status');
  try { await navigator.clipboard.writeText(email); copy.textContent = 'EMAIL COPIED ✓'; if(status)status.textContent='Email address copied to clipboard.'; }
  catch { copy.textContent = 'SELECT THE EMAIL ABOVE TO COPY'; if(status)status.textContent=`Copy manually: ${email}`; }
  window.setTimeout(()=>{copy.innerHTML='COPY EMAIL <span>⧉</span>';},3000);
});

media.add('(pointer: fine) and (min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
  const cursor = document.querySelector<HTMLElement>('.custom-cursor');
  if (!cursor) return;
  const x = gsap.quickTo(cursor, 'x', { duration: .2, ease: 'power3' });
  const y = gsap.quickTo(cursor, 'y', { duration: .2, ease: 'power3' });
  const move = (event: PointerEvent) => {
    cursor.style.display = 'flex'; x(event.clientX); y(event.clientY);
    const target = (event.target as Element).closest<HTMLElement>('[data-cursor]');
    cursor.classList.toggle('active', Boolean(target));
    cursor.querySelector('span')!.textContent = target?.dataset.cursor ?? '';
  };
  const leave = () => { cursor.style.display = 'none'; };
  document.addEventListener('pointermove', move);document.addEventListener('pointerleave', leave);
  const magnets = [...document.querySelectorAll<HTMLElement>('.magnetic')];
  const handlers = magnets.map(el => {
    const move = (event: PointerEvent) => { const r=el.getBoundingClientRect(); gsap.to(el,{x:(event.clientX-r.left-r.width/2)*.17,y:(event.clientY-r.top-r.height/2)*.17,duration:.35}); };
    const leave = () => { gsap.to(el,{x:0,y:0,duration:.5,ease:'elastic.out(1,.5)'}); };
    el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);return {el,move,leave};
  });
  return () => { document.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);cursor.style.display='none';handlers.forEach(({el,move,leave})=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);gsap.set(el,{clearProps:'transform'});}); };
});

document.fonts.ready.then(refresh);
window.addEventListener('pagehide', () => { media.revert(); cleanup.forEach(fn=>fn()); ScrollTrigger.getAll().forEach(t=>t.kill()); }, {once:true});
