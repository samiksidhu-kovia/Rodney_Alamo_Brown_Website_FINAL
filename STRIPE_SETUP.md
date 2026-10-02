# Stripe setup for the Rodney Alamo Brown book store

The website uses a Stripe Payment Link so payment-card data never passes through the site.

## Create the live Stripe checkout

1. In Stripe, create a one-time product named `From Surviving to Living: Globetown to Greatness` at **$29.99 USD**.
2. Create a one-time U.S. shipping rate named `U.S. Book Shipping` at **$5.95 USD**.
3. Create a Payment Link for the product and configure it to:
   - collect the customer's full name, email, phone number, billing address, and shipping address;
   - ship to the United States;
   - use the $5.95 U.S. shipping rate;
   - allow customers to adjust quantity, with a practical maximum such as 10 copies;
   - display this preorder notice: `Preorder — ships after the October 2026 release.`;
   - show the seller's cancellation, refund, damaged-copy, privacy, and contact policies;
   - calculate tax automatically only after the seller has completed the required Stripe Tax registrations and settings;
   - send the Stripe receipt and payment confirmation;
   - redirect successful customers to `https://rodney-alamo-brown.mistahmainy.chatgpt.site/?order=success` or show Stripe's confirmation page.
4. Test the Payment Link in Stripe test mode, including address collection, shipping, tax, quantity, successful payment, failed payment, and the confirmation experience.
5. Copy the live `https://buy.stripe.com/...` URL into `dist/store-config.js` as the value of `stripePaymentLink`.
6. Upload the updated files or redeploy the site.

## Fulfillment

Paid orders and customer shipping details are available in the Stripe Dashboard. For automated
fulfillment, connect a server-side webhook for `checkout.session.completed`. Do not use the browser
redirect as proof of payment. Also handle delayed-payment success events if delayed payment methods
are enabled.

Never place a Stripe secret key in HTML, JavaScript, the ZIP package, or any public website file.
