# Mandala Network — project instructions

You are working on the live marketing site for **Mandala Network** (mandalanetwork.xyz).
Read this before changing anything.

---

## What this is

A **pure static site**. Two HTML pages, one stylesheet, one small JS file, self-hosted fonts and
optimised images. Vercel serves the files exactly as they are.

```
index.html                 home page
event-intelligence.html    /event-intelligence
vercel.json                routing, caching, security headers — REQUIRED
robots.txt                 crawler rules, incl. explicit allow for AI answer engines
sitemap.xml                two URLs
assets/css/fonts.css       @font-face declarations (self-hosted)
assets/css/site.css        the entire stylesheet — both pages share it
assets/js/site.js          FAQ accordion, upcoming-events switcher, process hover, scroll reveal
assets/fonts/*.woff2       Newsreader · Source Serif 4 · Archivo · Playfair Display
assets/img/*.webp          all imagery
```

## Hard rules — do not break these

1. **No build step. No framework. No bundler. No `package.json`.** If you find yourself adding
   one, stop — you have misread the project.
2. **Never delete `vercel.json`.** `"cleanUrls": true` in it is the only reason
   `/event-intelligence` works without `.html`.
3. **Never move or rename anything under `assets/`.** Every path in the HTML and CSS is absolute
   (`/assets/...`) and will break silently.
4. **Do not re-point fonts at Google Fonts.** They are deliberately self-hosted: faster first
   paint, one less third party, and no visitor data leaving the domain (this matters — the
   business operates from Monaco and serves EU clients).
5. **Do not re-compress `assets/img/*.webp`.** Already at target quality.
6. **Do not change copy tone or rewrite sentences.** The voice is the owner's. Fix grammar and
   incomplete sentences only. If a change would alter meaning, ask first.

## Type system

| Role | Face |
|---|---|
| Headings and subheadings | Newsreader |
| Body copy | Source Serif 4 |
| Small caps, labels, CTAs | Archivo |
| Cover wordmark only | Playfair Display |

Never introduce a fifth family. Never fall back to Times New Roman, Inter or Arial.

## Palette

```
#150C0C night      case study, events, contact
#331F18 cocoa      capabilities card, magazine
#34150F oxblood    cover, client strip
#FBF5EC linen      the thesis section
#F5F0E8 cream      FAQ
#F5EFE2 bone       text on dark
#85431E clay       accent on light grounds
#C08A5E copper     accent on dark grounds
#F2C879 lamp       CTA gold
#EACEAA champagne  contact + footer
```

These live as CSS custom properties at the top of `assets/css/site.css`. Change them there, not
inline.

---

## Deploying

The project is linked to Vercel after the first deploy (`.vercel/project.json` is written then).
From that point on, **every redeploy is one command from this folder**:

```bash
npx vercel --prod
```

No re-uploading, no dashboard, no drag-and-drop. Edit a file, run that, done in ~15 seconds.

`./deploy.sh` does the same thing plus a couple of sanity checks — prefer it.

### First deploy only

```bash
npx vercel --prod
```

Answer: set up and deploy **yes** · scope **Mandala Network's projects** · link to existing
project **no** · project name **mandala-network-site** · directory **./** · modify build settings
**no**. If asked for a framework preset, choose **Other** and leave build command, output
directory and install command **empty**.

A browser window opens once for login. That happens only the first time.

### Domain

Not automatic, and deliberately so. Once the `.vercel.app` URL looks right:
Vercel dashboard → project → **Settings → Domains** → add `mandalanetwork.xyz` and
`www.mandalanetwork.xyz`, set `www` to redirect to the apex. Every canonical URL in the HTML
points at `https://mandalanetwork.xyz/` with no `www` — if you make `www` canonical instead,
search and replace across `index.html`, `event-intelligence.html` and `sitemap.xml`.

**Never change DNS or add a domain without being asked to.**

---

## Check after every deploy

- Both pages load; cover image sharp
- `/event-intelligence` resolves without `.html`
- Headings in Newsreader, body in Source Serif 4 (a system serif means a `.woff2` failed to upload)
- No horizontal scrolling at 1440px, 820px and 390px
- FAQ opens and closes; only one item open at a time
- The three event tabs switch panel, background image and the `0X / 03` counter
- `/robots.txt` and `/sitemap.xml` return 200

---

## Things that are easy to get wrong

- **`#upcoming-events`** on the Event Intelligence page is targeted by four footer links on *both*
  pages. Don't rename that id.
- **The Event Intelligence cover nav uses absolute anchors** (`/#about`, `/#capabilities`,
  `/#case-studies`). The leading `/` is what makes cross-page navigation work. Don't strip it.
- **Both pages share `site.css` and `site.js`.** A change to either affects both. Check both.
- **`.brk` line breaks** in the thesis headline are authored on purpose and hidden below 1024px.
  They are not stray markup.
- **The FAQ and the events switcher fail open**: with JS off, a `<noscript>` block reveals all
  answers. Keep that block if you touch the head.

## Known open items

- Article card 3 in the Community Magazine section carries a different X post URL but the same
  headline as card 1. One headline is wrong — the owner needs to supply the correct one.
- The cover photo original is 653px wide, which is soft on large screens. A higher-resolution
  original would improve it.
- The word "evential" was corrected to "experience" on the Event Intelligence page; the owner
  was asked to confirm.
