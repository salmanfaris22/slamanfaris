# Course checkout

Course cards, detail pages and mentorship use Razorpay-hosted payment pages. No secret key is shipped to the browser. Reference: https://razorpay.com/docs/payments/payment-pages/

Before opening enrolment:

1. Confirm the course price, delivery format, access duration, refund terms and availability.
2. Create a reusable hosted Payment Page in the owner's Razorpay dashboard. Set the amount and collect the learner contact details there.
3. Set the matching `PUBLIC_RAZORPAY_<COURSE_SLUG_WITH_UNDERSCORES>` environment variable to the HTTPS payment page URL (see `.env.example`).
4. Set that course's `fee` and `status: 'available'` in `src/data/courses.ts`, then rebuild. Until then, cards link to the syllabus and enquiry form.
5. Set `PUBLIC_RAZORPAY_MENTORSHIP` only when the session offer and price are agreed on the payment page.
6. Verify payment in Razorpay before sending course access. This static website does not provision learner accounts or verify payments; visiting `/enrolled/` never confirms payment.

Prices pasted as design references have not been published as confirmed offers. Reviews, ratings, discounts, certificates, lifetime access, free lessons and bundles need verified details before publication.
