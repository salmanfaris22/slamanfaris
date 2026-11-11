import type { Course } from '../data/courses';

/** Public hosted checkout URLs only; no API secrets belong in this static site. */
export function razorpayUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  const url = new URL(value);
  if (url.protocol !== 'https:' || !['rzp.io', 'rzp.pay', 'pages.razorpay.com'].includes(url.hostname) || url.username || url.password) {
    throw new Error('Use an HTTPS Razorpay hosted payment page URL.');
  }
  return url.href;
}
export function coursePayment(course: Course): string | undefined {
  if (course.status !== 'available' || !course.fee) return undefined;
  const key = `PUBLIC_RAZORPAY_${course.slug.replaceAll('-', '_').toUpperCase()}`;
  return razorpayUrl(import.meta.env[key] || course.registrationUrl);
}
export const mentorshipPayment = razorpayUrl(import.meta.env.PUBLIC_RAZORPAY_MENTORSHIP);
