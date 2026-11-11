// Conversion events and optional analytics. Every tool loads only when its ID is set at build time,
// and only after the visitor accepts. Events carry a label and path, never names, emails or messages.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string };
  }
}

interface Config { ga4: string; clarity: string; gtm: string; metaPixel: string; }

const CONSENT_KEY = 'analytics-consent';
const pending: [string, Record<string, string>][] = [];
let ready = false;

const metaEvents: Record<string, string> = { contact_form_submit: 'Lead', course_enquiry: 'Lead', course_registration: 'CompleteRegistration' };

function send(name: string, payload: Record<string, string>) {
  window.gtag?.('event', name, payload);
  window.dataLayer?.push({ event: name, ...payload });
  window.clarity?.('event', name);
  if (metaEvents[name]) window.fbq?.('track', metaEvents[name]);
}

export function track(name: string, detail: Record<string, string> = {}) {
  const payload = { page_path: location.pathname, ...detail };
  window.dispatchEvent(new CustomEvent('site:track', { detail: { name, ...payload } }));
  if (ready) send(name, payload);
  else pending.push([name, payload]);
}

function addScript(src: string) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

function readConfig(): Config | null {
  try {
    const config = JSON.parse(document.body.dataset.analytics || '{}') as Config;
    return config.ga4 || config.clarity || config.gtm || config.metaPixel ? config : null;
  } catch {
    return null;
  }
}

function loadAnalytics(config: Config) {
  if (ready) return;
  ready = true;
  if (config.ga4 || config.gtm) window.dataLayer = window.dataLayer || [];
  if (config.gtm) {
    window.dataLayer?.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    addScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtm)}`);
  }
  if (config.ga4) {
    window.gtag = function gtag() {
      // gtag.js reads the raw arguments object, so this cannot be an arrow function.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', config.ga4);
    addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga4)}`);
  }
  if (config.clarity) {
    const queue = function clarity(...args: unknown[]) {
      (queue.q = queue.q || []).push(args);
    } as NonNullable<Window['clarity']>;
    window.clarity = queue;
    addScript(`https://www.clarity.ms/tag/${encodeURIComponent(config.clarity)}`);
  }
  if (config.metaPixel) {
    const pixel = function fbq(...args: unknown[]) {
      (pixel.queue = pixel.queue || []).push(args);
    } as NonNullable<Window['fbq']>;
    pixel.loaded = true;
    pixel.version = '2.0';
    window.fbq = pixel;
    addScript('https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', config.metaPixel);
    window.fbq('track', 'PageView');
  }
  for (const [name, payload] of pending.splice(0)) send(name, payload);
}

function initConsent() {
  const config = readConfig();
  if (!config) return;
  const banner = document.getElementById('consent');
  let choice: string | null = null;
  try {
    choice = localStorage.getItem(CONSENT_KEY);
  } catch {
    choice = null;
  }

  const start = () => {
    const run = () => loadAnalytics(config);
    if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 3000 });
    else setTimeout(run, 1500);
  };

  if (choice === 'yes') start();
  else if (!choice && banner) banner.hidden = false;

  document.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-consent]');
    if (!button) return;
    const accepted = button.dataset.consent === 'yes';
    try {
      localStorage.setItem(CONSENT_KEY, accepted ? 'yes' : 'no');
    } catch { /* the choice just lasts for this page */ }
    if (banner) banner.hidden = true;
    if (accepted) start();
  });
  document.querySelector('[data-consent-reset]')?.addEventListener('click', () => {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch { /* nothing to clear */ }
    if (banner) banner.hidden = false;
  });
}

window.addEventListener('load', initConsent, { once: true });

for (const marker of document.querySelectorAll<HTMLElement>('[data-view-event]')) {
  track(marker.dataset.viewEvent || 'view', { item: marker.dataset.viewLabel || '' });
}

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement | null;
  const link = target?.closest<HTMLAnchorElement>('a');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  if (href.startsWith('mailto:')) track('email_click');
  else if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) track('whatsapp_click');
  else if (link.dataset.cta) track('cta_click', { cta_label: link.dataset.cta });
  else if (link.hasAttribute('download')) track('download_click', { file: href });
  else if (link.hostname && link.hostname !== location.hostname) track('outbound_click', { link_domain: link.hostname });
});

export {};
