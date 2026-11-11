// Contact and course forms. With PUBLIC_FORM_ENDPOINT set, the form posts to that service and shows
// real success and failure states. Without it, the message opens in the visitor's email or WhatsApp.
import { track } from './track';

function buildMessage(form: HTMLFormElement) {
  const lines: string[] = [];
  for (const [key, value] of new FormData(form).entries()) {
    if (key === 'company_site' || typeof value !== 'string' || !value.trim()) continue;
    lines.push(`${key}: ${value.trim()}`);
  }
  return lines.join('\n');
}

function validate(form: HTMLFormElement) {
  let firstBad: HTMLElement | null = null;
  for (const field of form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea')) {
    const ok = field.checkValidity();
    field.setAttribute('aria-invalid', String(!ok));
    if (!ok && !firstBad) firstBad = field;
  }
  firstBad?.focus();
  return !firstBad;
}

function setStatus(form: HTMLFormElement, text: string, kind: 'ok' | 'bad') {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  if (!status) return;
  status.hidden = false;
  status.textContent = text;
  status.dataset.kind = kind;
}

for (const form of document.querySelectorAll<HTMLFormElement>('[data-enquiry]')) {
  const variant = form.dataset.enquiry;
  const eventName = variant === 'course' ? 'course_enquiry' : 'contact_form_submit';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validate(form)) {
      setStatus(form, 'Check the highlighted fields, then send again.', 'bad');
      return;
    }
    // Bots fill hidden fields. People never see this one.
    if ((form.elements.namedItem('company_site') as HTMLInputElement | null)?.value) return;

    const message = buildMessage(form);
    const subject = variant === 'course' ? 'Course enquiry from salmanfaris.in' : 'Project enquiry from salmanfaris.in';
    const { endpoint, email, whatsapp } = form.dataset;

    if (endpoint) {
      const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (button) button.disabled = true;
      try {
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ subject, message }) });
        if (!response.ok) throw new Error(String(response.status));
        form.reset();
        setStatus(form, 'Thanks. Your enquiry has been sent, and you will get a reply soon.', 'ok');
        track(eventName, { method: 'form' });
      } catch {
        setStatus(form, `That did not send. Please try again or email ${email}.`, 'bad');
      } finally {
        if (button) button.disabled = false;
      }
      return;
    }

    const prefersWhatsapp = (form.elements.namedItem('Preferred contact method') as HTMLSelectElement | null)?.value === 'WhatsApp';
    if (whatsapp && prefersWhatsapp) {
      track(eventName, { method: 'whatsapp' });
      window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(`${subject}\n\n${message}`)}`, '_blank', 'noopener');
    } else {
      track(eventName, { method: 'email' });
      location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    }
    setStatus(form, `Your email app should open with this message. If it does not, write to ${email}.`, 'ok');
  });
}

// Pre-select a course or service from the link that brought the visitor here.
const params = new URLSearchParams(location.search);
const preset = (name: string, value: string | null) => {
  if (!value) return;
  const select = document.querySelector<HTMLSelectElement>(`select[name="${name}"]`);
  if (select && [...select.options].some((option) => option.value === value)) select.value = value;
};
preset('Course', params.get('course'));
preset('Service required', params.get('service'));
