# Mandala Network - project instructions

You are working on the live marketing site for **Mandala Network** (mandalanetwork.xyz).
Read this before changing anything.

---

## What this is

A **pure static site**. Two HTML pages, one stylesheet, one small JS file, self-hosted fonts and
optimised images. Vercel serves the files exactly as they are.

```
index.html                 home page
event-intelligence.html    /event-intelligence
vercel.json                routing, caching, security headers - REQUIRED
favicon.ico                root icon, 16/32/48/64. Crawlers request /favicon.ico directly and
                           ignore the <link> tag, so this must stay at the ROOT, not in assets/
apple-touch-icon.png       180x180 on an opaque ground, since iOS ignores transparency
robots.txt                 crawler rules, incl. explicit allow for AI answer engines
sitemap.xml                two URLs
assets/css/fonts.css       @font-face declarations (self-hosted)
assets/css/site.css        the entire stylesheet - both pages share it
assets/js/site.js          FAQ accordion, events switcher, process hover, scroll reveal,
                           chart draw-in, Devcon countdown
assets/fonts/*.woff2       Newsreader · Source Serif 4 · Archivo · Playfair Display
assets/img/*.webp          all imagery
assets/img/logo-mark-light.webp    logo, strapline masked off - cover and EI header
assets/img/logo-lockup-warm.webp   full logo, warm colourway - spare since 4 Sep 2026
assets/img/logo-lockup-*.webp      full logo, neutral colourways - spare
assets/img/mandala-mark*.webp      the mandala monogram alone
```

## Hard rules - do not break these

1. **No build step. No framework. No bundler. No `package.json`.** If you find yourself adding
   one, stop - you have misread the project.
2. **Never delete `vercel.json`.** `"cleanUrls": true` in it is the only reason
   `/event-intelligence` works without `.html`.
3. **Never move or rename anything under `assets/`.** Every path in the HTML and CSS is absolute
   (`/assets/...`) and will break silently.
4. **Do not re-point fonts at Google Fonts.** They are deliberately self-hosted: faster first
   paint, one less third party, and no visitor data leaving the domain (this matters - the
   business operates from Monaco and serves EU clients).
5. **Do not re-compress `assets/img/*.webp`.** Already at target quality.
6. **Do not change copy tone or rewrite sentences.** The voice is the owner's. Fix grammar and
   incomplete sentences only. If a change would alter meaning, ask first.
7. **Never crop the logo to remove the strapline.** The mandala wheel is TALLER than the wordmark
   on both sides, so cutting at the wordmark's baseline slices the bottom off the wheel. This has
   gone wrong twice. To drop the strapline, mask its alpha (rows ~130-162, x >= 208 in the
   803x201 source) and then trim to the ink bounding box. `logo-mark-light.webp` is already
   correct - reuse it rather than regenerating.
8. **Sections share one left edge, with one deliberate exception.** The owner asked for this
   explicitly. The exception is **The Process**, which the owner asked to centre on 4 September
   2026: its title, all three steps (illustration, number, heading and copy) and the dots are
   centred. Everything else stays left: the client strip, the events card, every other section.
   If you add a section, it starts at the `.shell` rail like everything else.
9. **No em dashes anywhere.** The owner asked for this. Use a colon, a comma, or a full stop.

## Type system

| Role | Face |
|---|---|
| Headings and subheadings | Newsreader |
| Body copy | Source Serif 4 |
| Small caps, labels, CTAs | Archivo |
| Lockup wordmark only | Playfair Display |

Never introduce a fifth family. Never fall back to Times New Roman, Inter or Arial. The cover
slogan is Newsreader italic at display size - that is the "handwritten" treatment, and it is
deliberate. Do not swap it for a script face.

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

**READ THIS BEFORE THE FIRST DEPLOY.** As of this handoff there is **no `.vercel` folder**, so
this folder is not linked to any project. `mandalanetwork.xyz` is already live and served by an
EXISTING Vercel project, under a login that may not be the one you are signed in as. If you run
`npx vercel --prod` and let it CREATE a new project, the deploy will succeed and the live site
will not change, because the domain still points at the old project.

Link first, do not create:

```bash
npx vercel whoami     # confirm the account
npx vercel link       # answer YES to "Link to existing project?" and pick the one
                      # serving mandalanetwork.xyz. Never create a new project here.
```

If no project under that login serves the domain, STOP and ask the owner which Vercel account
deployed it. Once `.vercel/project.json` exists, **every redeploy is one command from this
folder**:

```bash
npx vercel --prod
```

No re-uploading, no dashboard, no drag-and-drop. Edit a file, run that, done in ~15 seconds.

`./deploy.sh` does the same thing plus a couple of sanity checks - prefer it.

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
points at `https://mandalanetwork.xyz/` with no `www` - if you make `www` canonical instead,
search and replace across `index.html`, `event-intelligence.html` and `sitemap.xml`.

**Never change DNS or add a domain without being asked to.**

---

## Check after every deploy

- Both pages load; cover image sharp
- `/event-intelligence` resolves without `.html`
- Headings in Newsreader, body in Source Serif 4 (a system serif means a `.woff2` failed to upload)
- No horizontal scrolling at 1440px, 820px and 390px
- FAQ items open and close independently; the first two start open
- The three event tabs switch panel, background image and the `0X / 03` counter
- `/robots.txt` and `/sitemap.xml` return 200

---

## Things that are easy to get wrong

- **`#upcoming-events`** on the Event Intelligence page is targeted by four links in the home-page
  footer. Don't rename that id.
- **The Event Intelligence page has no cover and no footer** - a slim `.bar` header only. That is
  deliberate; the page is meant to be short.
- **The report email capture is commented out**, not deleted. It sits in `index.html` under a
  note in the Community Magazine section, fully styled and ready. To switch it on: un-comment the
  block and replace `FORMSPREE_ID` with a real formspree.io endpoint. `deploy.sh` strips HTML
  comments before checking, so a commented block is a yellow warning and deploys fine, while a
  LIVE form still pointing at the placeholder hard-fails. Do not weaken that guard.
- **The Event Intelligence nav uses absolute anchors** (`/#about`, `/#capabilities`,
  `/#case-studies`). The leading `/` is what makes cross-page navigation work. Don't strip it.
- **Both pages share `site.css` and `site.js`.** A change to either affects both. Check both.
- **Section order** is Cover, Clients, Thesis, Capabilities, Case study, Events, Report, FAQ,
  Contact. This order was set by the owner after trying it both ways. Do not reorder.
- **The Let's talk block opens with the logo, not a heading.** `h2.contact__mark` wraps the
  logo; the footer carries "Mandala Network" as small Archivo caps instead. That swap was
  deliberate. On 4 September 2026 the owner asked for it smaller and cleaner, so it moved from
  `logo-lockup-warm.webp` at 440px to `logo-mark-light.webp` at 250px. The strapline is under
  13px tall below about 300px wide and turns to mush, which is why the strapline-free mark is
  used here rather than simply scaling the warm one down.
- **The cover photo is graded in CSS**, not baked in: a warm hue shift on `.cover__img` plus a
  radial vignette in `.cover__veil`. It pulls the carpet out of magenta and into the palette.
  Don't flatten it back to a plain dark overlay.
- **`.brk` line breaks** in the thesis headline are authored on purpose and hidden below 1024px.
  They are not stray markup.
- **The FAQ and the events switcher fail open**: with JS off, a `<noscript>` block reveals all
  answers. Keep that block if you touch the head.

## Known open items

- **The Formspree endpoint does not exist yet.** The capture block is commented out until it does
  (see above).
- ~~`from relationships to real outcomes` appeared twice at the bottom of the home page.~~
  RESOLVED 4 September 2026: the Let's talk block now uses the strapline-free mark, so the line
  survives only in the footer base bar.
- Article card 3 in the Community Magazine section carries a different X post URL but the same
  headline as card 1. One headline is wrong - the owner needs to supply the correct one.
- The cover photo original is 653px wide, which is soft on large screens. A higher-resolution
  original would improve it.
- The word "evential" was corrected to "experience" on the Event Intelligence page; the owner
  was asked to confirm.
- The Devcon Mumbai countdown targets **3 November 2026** (`assets/js/site.js`). It hides itself
  once that date passes. Change the date there if the event moves.
