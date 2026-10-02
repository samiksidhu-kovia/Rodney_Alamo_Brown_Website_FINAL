# Rodney Alamo Brown — Hosting Package

This folder contains the complete static production website. Upload everything in this folder to the web root of the hosting account. The home page is `index.html`; no build step or database is required.

## Store configuration

- Online preorder price: **$29.99**
- United States flat-rate shipping: **$5.95**
- Release: **October 2026**
- Book-tour in-person price: **$19.99**, with no shipping, handling, or processing fees

Before enabling payments, create the Stripe Payment Link described in `STRIPE_SETUP.md`. Paste the completed `https://buy.stripe.com/...` address into the `stripePaymentLink` field in `store-config.js`. Do not add a Stripe secret key to any website file.

Until that link is supplied, the checkout control intentionally displays **Stripe checkout is being connected** and will not collect payment information.

## Hosting checklist

1. Upload all files and the `assets` folder without changing their relative paths.
2. Confirm HTTPS is enabled for the domain.
3. Add the live Stripe Payment Link to `store-config.js`.
4. Test a Stripe purchase in test mode, including email, phone, shipping address, quantity, tax, and the $5.95 shipping rate.
5. Configure Stripe fulfillment notifications or a `checkout.session.completed` webhook before accepting live orders.
6. Replace the social and contact placeholders when the final Facebook, YouTube, and contact destinations are available.

## Included sections

- Premium memoir preorder storefront
- Chosen Vessel Book Tour event and signing details
- Chapter 9 preview, “Grace in the Storm”
- “Community Love” documentary first look, press copy, and full credits
- The Author’s Chair feature
- January 2027 live podcast announcement
- Author biography, honors, service, and contact areas

All photography is displayed proportionally to prevent stretching, and the layout is responsive for desktop, tablet, and mobile screens.
