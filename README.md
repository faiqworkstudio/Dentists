# Bangkok Dental Care — website

Static multi-page site. No build step — deploy the folder as-is on Vercel (Framework Preset "Other"). `vercel.json` turns on clean URLs, so `treatments.html` is served at `/treatments`.

The site is in **English** (root) and **Thai** (`/th/`). Every page has an EN | ไทย switch in the header that opens the same page in the other language.

| Page | English | Thai |
| --- | --- | --- |
| Home | `index.html` | `th/index.html` |
| Treatments & prices | `treatments.html` | `th/treatments.html` |
| Our dentists | `dentists.html` | `th/dentists.html` |
| The clinic | `clinic.html` | `th/clinic.html` |
| Book & contact | `contact.html` | `th/contact.html` |

Patient reviews are shown in their original English on both versions (the Thai pages say so).

Shared styles in `styles.css`, behaviour (mobile menu, open/closed badge, scroll reveals, booking form — messages switch to Thai on Thai pages) in `script.js`. The header, call-to-action band and footer are repeated in each page — edit all ten when changing them.

## Design
Built from the logo on the clinic's marble wall: a white tooth cradled by a thin gold crescent, gold sparkles and a chocolate-brown wordmark. The site uses the same palette (marble white, gold, chocolate), simple rounded shapes, no decorative overlays, and warm, plain-spoken copy. Fonts (Google Fonts): **K2D** for headings in both languages (its rounded-square letters match the wordmark), **Figtree** for English body text and **IBM Plex Sans Thai Looped** for Thai body text (looped Thai letters read most clearly and formally in paragraphs). Thai pages use taller line spacing so stacked vowels and tone marks don't collide.

### Logo files (transparent, vector)
- `images/logo.svg` — full logo, chocolate wordmark, for light backgrounds
- `images/logo-light.svg` — cream wordmark, for dark backgrounds
- `images/logo-mark.svg` — moon, tooth and sparkles only (favicon, small uses)

These are a vector redraw of the wall logo; if the clinic has the original artwork, swap it in under the same names.

## Images
### Homepage hero image
The home hero is a full-width image with the text on its calm left side. The image is an artwork made for the site (not a photo): the clinic's marble wall with the gold crescent logo sign, soft window light and palm-leaf shadows.
- `images/hero.jpg` — desktop, 3200 × 1500 px; keep the left ~45% calm and light, since the text sits there.
- `images/hero-mobile.jpg` — phones, 1200 × 1600 px; the sign sits in the top third and the text sits below it.

To use a photo instead, replace these two files with the same sizes and layout (subject on the right on desktop, at the top on phones).

## To confirm with the clinic
- Have a native Thai speaker on the clinic team read through the Thai pages before launch.
- Set the live domain in the page `<head>` language links (`hreflang`) once known.
- Prices: implants from ฿40,000 and ceramic/zirconia crowns ฿15,000 come from the clinic's counter signage (photo Dec 2018).
- Opening hour (`HOURS` in `script.js`); signage says open daily until 20:00.
- Dentists' names, photos and qualifications (TODO in `dentists.html`).
- Exact Facebook page URL (`contact.html`).
- The friendly promises in the copy ("we listen first", "clear prices up front", "we'll do our best to fit you in" if in pain) — make sure they match how the clinic works.
- Where booking requests should go — the form currently asks the patient to call (TODO in `script.js`).
