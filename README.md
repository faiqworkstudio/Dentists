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
Built from the logo on the clinic's marble wall: a white tooth cradled by a thin gold crescent, gold sparkles and a chocolate-brown wordmark. The site uses the same palette (marble white, gold, chocolate), rounded shapes, and warm, plain-spoken copy. Fonts: K2D (headings and Thai — its rounded-square letters match the wordmark) and Figtree (body).

### Logo files (transparent, vector)
- `images/logo.svg` — full logo, chocolate wordmark, for light backgrounds
- `images/logo-light.svg` — cream wordmark, for dark backgrounds
- `images/logo-mark.svg` — moon, tooth and sparkles only (favicon, small uses)

These are a vector redraw of the wall logo; if the clinic has the original artwork, swap it in under the same names.

## Images
### Homepage hero background
The home hero is a full-width photo with the text on top. Replace these two files (same names) with your final photo:
- `images/hero.jpg` — desktop, **2560 × 1100 px** (landscape). Keep the subject on the right half; the left half sits under the headline and a dark overlay.
- `images/hero-mobile.jpg` — phones, **1080 × 1440 px** (portrait, 3:4), face in the upper half.

The current photo (patient in the dental chair) was supplied at 600 × 399 px and enlarged, so it looks soft on big screens — use a high-resolution copy at the same names, and make sure it's licensed for the clinic's use. On desktop the photo fills the right ~70% of the hero and fades into the dark left side under the text; on phones it shows at the top, above the text.

`images/` also holds clinic photos taken from the Google Maps listing. They are small (about 600px wide), so replace them with the clinic's original files at the same names when possible. Confirm the clinic is happy for these photos to be used; some Google Maps photos are uploaded by visitors rather than the owner.

## To confirm with the clinic
- Prices: implants from ฿40,000 and ceramic/zirconia crowns ฿15,000 come from the clinic's counter signage (photo Dec 2018).
- Opening hour (`HOURS` in `script.js`); signage says open daily until 20:00.
- Dentists' names, photos and qualifications (TODO in `dentists.html`).
- Exact Facebook page URL (`contact.html`).
- The friendly promises in the copy ("we listen first", "clear prices up front", "we'll do our best to fit you in" if in pain) — make sure they match how the clinic works.
- Where booking requests should go — the form currently asks the patient to call (TODO in `script.js`).
