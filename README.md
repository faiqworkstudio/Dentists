# Bangkok Dental Care — website

Static multi-page site. No build step — deploy the folder as-is on Vercel (Framework Preset "Other"). `vercel.json` turns on clean URLs, so `treatments.html` is served at `/treatments`.

| Page | File |
| --- | --- |
| Home | `index.html` |
| Treatments & prices | `treatments.html` |
| Our dentists | `dentists.html` |
| The clinic | `clinic.html` |
| Book & contact | `contact.html` |

Shared styles in `styles.css`, behaviour (mobile menu, open/closed badge, scroll reveals, booking form) in `script.js`. The header, call-to-action band and footer are repeated in each page — edit all five when changing them.

## Design
Built from the clinic's own branding: the orange crescent-moon logo sign (`images/logo.jpg`, cut from the storefront photo), orange dental chairs, gold moon and sparkles, chocolate brown and cream marble. Fonts: Fraunces, Figtree, Mitr (Thai).

## Images
`images/` holds the logo and clinic photos taken from the Google Maps listing. They are small (about 600px wide), so replace them with the clinic's original files at the same names when possible — especially `logo.jpg` (ask for the vector/PNG logo). Confirm the clinic is happy for these photos to be used; some Google Maps photos are uploaded by visitors rather than the owner.

## To confirm with the clinic
- Prices: implants from ฿40,000 and ceramic/zirconia crowns ฿15,000 come from the clinic's counter signage (photo Dec 2018).
- Opening hour (`HOURS` in `script.js`); signage says open daily until 20:00.
- Dentists' names, photos and qualifications (TODO in `dentists.html`).
- Exact Facebook page URL (`contact.html`).
- Where booking requests should go — the form currently asks the patient to call (TODO in `script.js`).
