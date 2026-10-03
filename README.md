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
### Page hero images
Every page opens with a full-width photo and the page's text on the left (a soft light wash sits behind the text so it stays readable). On phones the photo sits on top and the text below.

| Page | Photo (free, Unsplash License) | Desktop 2560 × 1200 | Phone 1200 × 1000 |
| --- | --- | --- | --- |
| Home | Bright clinic with orange dental chair — [photo-1598256989800](https://images.unsplash.com/photo-1598256989800-fe5f95da9787) (mirrored) | `images/hero.jpg` | `images/hero-mobile.jpg` |
| Treatments | Hands holding a dental model — [photo-1468493858157](https://images.unsplash.com/photo-1468493858157-0da44aaf1d13) | `images/hero-treatments.jpg` | `images/hero-treatments-mobile.jpg` |
| Our dentists | Dentist explaining an X-ray — [photo-1606811841689](https://images.unsplash.com/photo-1606811841689-23dfddce3e95) | `images/hero-dentists.jpg` | `images/hero-dentists-mobile.jpg` |
| The clinic | Bright clinic with marble floor and palm — [photo-1631248055158](https://images.unsplash.com/photo-1631248055158-edec7a3c072b) | `images/hero-clinic.jpg` | `images/hero-clinic-mobile.jpg` |
| Contact | Treatment room with tropical garden — [photo-1609207825181](https://images.unsplash.com/photo-1609207825181-52d3214556dd) (mirrored) | `images/hero-contact.jpg` | `images/hero-contact-mobile.jpg` |

These are stock photos, not the clinic itself. Swap in the clinic's own photos at the same sizes when available (subject on the right on desktop).

## To confirm with the clinic
- Have a native Thai speaker on the clinic team read through the Thai pages before launch.
- Set the live domain in the page `<head>` language links (`hreflang`) once known.
- Prices: implants from ฿40,000 and ceramic/zirconia crowns ฿15,000 come from the clinic's counter signage (photo Dec 2018).
- Opening hour (`HOURS` in `script.js`); signage says open daily until 20:00.
- Dentists' names, photos and qualifications (TODO in `dentists.html`).
- Exact Facebook page URL (`contact.html`).
- The friendly promises in the copy ("we listen first", "clear prices up front", "we'll do our best to fit you in" if in pain) — make sure they match how the clinic works.
- Where booking requests should go — the form currently asks the patient to call (TODO in `script.js`).

### Section photos
`images/photos/` holds free Unsplash photos (Unsplash License) used in the sections below the heroes: implant model, aligners, dental model, X-rays, toothbrushes, a smiling team member, clinic interiors and the caring-hands photo in the "Come and say hello" band. The "Inside the clinic" carousel uses only the clinic's own photos. Replace any stock photo with the clinic's own at the same file name.

### Motion
Smooth wheel scrolling on desktop, photos that open like a curtain and drift gently (parallax) as you scroll, count-up numbers, a moving band of treatment names, a "how a visit works" line that draws itself, a draggable photo carousel, and a header that tucks away when scrolling down. All motion turns off for visitors who ask for reduced motion.
