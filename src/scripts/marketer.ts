// Marketer page: the 60-second marketing check and the live page-speed meter.
// Nothing is stored or sent. The result only leaves the page if the visitor chooses to send it.
import { track } from './track';

interface Band { min: number; label: string; text: string; }

function initHealthCheck() {
  const form = document.querySelector<HTMLFormElement>('[data-hc]');
  if (!form) return;
  const sets = [...form.querySelectorAll<HTMLFieldSetElement>('fieldset[data-weight]')];
  const bands = JSON.parse(form.dataset.bands || '[]') as Band[];
  const $ = <T extends HTMLElement>(selector: string) => form.querySelector<T>(selector);
  const scoreEl = $('[data-hc-score]');
  const ring = $('[data-hc-ring]');
  const progress = $('[data-hc-progress]');
  const band = $('[data-hc-band]');
  const text = $('[data-hc-text]');
  const fixes = $<HTMLOListElement>('[data-hc-fixes]');
  const send = $<HTMLAnchorElement>('[data-hc-send]');
  const whatsapp = $<HTMLAnchorElement>('[data-hc-whatsapp]');
  const reset = $<HTMLButtonElement>('[data-hc-reset]');
  let reported = false;

  const update = () => {
    let score = 0;
    let answered = 0;
    const gaps: { q: string; fix: string; href: string; weight: number; unsure: boolean }[] = [];
    for (const set of sets) {
      const value = set.querySelector<HTMLInputElement>('input:checked')?.value;
      const weight = Number(set.dataset.weight);
      set.dataset.answer = value || '';
      if (!value) continue;
      answered += 1;
      if (value === 'yes') score += weight;
      else gaps.push({ q: set.dataset.q || '', fix: set.dataset.fix || '', href: set.dataset.href || '#', weight, unsure: value === 'unsure' });
    }
    const done = answered === sets.length;
    if (scoreEl) scoreEl.textContent = String(score);
    ring?.style.setProperty('--score', String(score));
    if (progress) progress.textContent = done ? 'All 10 answered' : `${answered} of ${sets.length} answered`;
    const current = bands.find((item) => score >= item.min) ?? bands[bands.length - 1];
    if (band) band.textContent = done ? current.label : answered ? 'Keep going…' : 'Answer the questions to see your score';
    if (text) text.textContent = done ? current.text : answered ? 'Your full score and top fixes appear when all 10 are answered.' : '';
    form.dataset.state = done ? 'done' : answered ? 'partial' : 'empty';

    const top = gaps.sort((a, b) => b.weight - a.weight).slice(0, 3);
    if (fixes) {
      fixes.replaceChildren(...(done ? top : []).map((gap) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = gap.href;
        link.className = 'text-link';
        link.textContent = gap.unsure ? `Check this first: ${gap.fix}` : gap.fix;
        li.append(link);
        return li;
      }));
    }

    const lines = sets.map((set, index) => `${index + 1}. ${set.dataset.q} ${({ yes: 'Yes', no: 'No', unsure: 'Not sure' } as Record<string, string>)[set.dataset.answer || ''] || 'Not answered'}`);
    const body = [`My marketing check score: ${score}/100 (${done ? current.label : 'not finished'}).`, '', ...lines, '', `From ${location.href}`].join('\n');
    const subject = `Marketing check: ${score}/100`;
    if (send) send.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (whatsapp && form.dataset.whatsapp) whatsapp.href = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(body)}`;

    if (done && !reported) {
      reported = true;
      track('health_check_complete', { score_band: current.label });
    }
  };

  form.addEventListener('change', update);
  form.addEventListener('submit', (event) => event.preventDefault());
  reset?.addEventListener('click', () => {
    form.reset();
    reported = false;
    update();
    sets[0]?.querySelector<HTMLInputElement>('input')?.focus();
  });
  update();
}

function initMeter() {
  const meter = document.querySelector<HTMLElement>('[data-meter]');
  const time = meter?.querySelector<HTMLElement>('[data-meter-time]');
  const weight = meter?.querySelector<HTMLElement>('[data-meter-weight]');
  if (!meter || !time || !('performance' in window) || !performance.getEntriesByType) return;
  let lcp = 0;
  try {
    new PerformanceObserver((list) => {
      const last = list.getEntries().at(-1);
      if (last) lcp = last.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch { /* LCP is not supported here, so the ready time is used instead */ }

  const show = () => {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const ready = lcp || nav?.domContentLoadedEventEnd || 0;
    if (!ready) return;
    time.textContent = `${(ready / 1000).toFixed(2)} s`;
    meter.dataset.metric = lcp ? 'lcp' : 'ready';
    const bytes = [nav, ...performance.getEntriesByType('resource')].reduce((sum, entry) => sum + ((entry as PerformanceResourceTiming | undefined)?.encodedBodySize || 0), 0);
    if (weight && bytes > 0) weight.textContent = `${Math.round(bytes / 1024)} KB`;
    meter.dataset.live = 'true';
  };
  if (document.readyState === 'complete') setTimeout(show, 0);
  else window.addEventListener('load', () => setTimeout(show, 0), { once: true });
}

initHealthCheck();
initMeter();
