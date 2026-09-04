# Mandala Network - deployment instructions

**For Claude Code (or any engineer). Follow exactly. Do not restructure the project.**

This is a **pure static site**. There is no build step, no framework, no `package.json` to install,
no server-side code. Vercel serves these files as-is. Anything that looks like a build step is wrong.

---

## 1. What is in this folder

```
index.html                     the home page
event-intelligence.html        the Event Intelligence page (/event-intelligence)
vercel.json                    routing, caching and security headers - REQUIRED, do not delete
robots.txt                     crawler rules, incl. explicit allow for AI answer engines
sitemap.xml                    two URLs
DEPLOY.md                      this file (safe to leave in place, or delete before deploying)
assets/
  css/fonts.css                self-hosted @font-face declarations
  css/site.css                 the stylesheet
  js/site.js                   ~95 lines: FAQ accordion, upcoming-events switcher, process hover, scroll reveal
  fonts/*.woff2                Newsreader, Source Serif 4, Archivo, Playfair Display (latin subsets)
  img/*.webp                   all imagery, optimised
```

Total: ~1.8 MB on disk, ~410 KB on first page load.

---

## 2. Deploy

> ### ⚠️ Read this before running anything
> There is already a Vercel project called **`mandala-network`** - a Next.js 15 app (App Router,
> Tailwind 4), with a local repo at `~/Documents/GitHub/mandala-network`.
> **Do not deploy this static site into that project.** Its build settings expect Next.js, and
> linking here would either fail the build or overwrite a live deployment.
>
> Choose one, deliberately:
> - **Recommended:** deploy this as a **new** Vercel project - e.g. `mandala-network-site` - get a
>   preview URL, check it, and only then move the `mandalanetwork.xyz` domain across from the old
>   project. Zero-downtime, fully reversible.
> - **Or**, if the Next.js app is being retired: retire it explicitly first (rename or delete the
>   project) before creating this one, rather than deploying over it.
>
> When prompted to link to an existing project, the answer is **no** unless you have deliberately
> created a separate project for this static site and want to redeploy to it.

From inside this folder:

```bash
npx vercel --prod
```

Answer the prompts as follows:

| Prompt | Answer |
|---|---|
| Set up and deploy? | **yes** |
| Which scope? | the Mandala Network account/team |
| Link to existing project? | **no** (see the warning above) |
| Project name | `mandala-network-site` |
| In which directory is your code located? | `./` |
| Want to modify build settings? | **no** |

If Vercel asks for a framework preset, choose **Other**.
Build command: **leave empty**. Output directory: **leave empty** (or `.`). Install command: **leave empty**.

### Alternative: deploy from the dashboard
Drag this folder onto https://vercel.com/new. Framework preset **Other**, no build command,
output directory `.`.

---

## 3. Domain

After the first successful deploy:

1. Vercel dashboard → the project → **Settings → Domains**
2. Add `mandalanetwork.xyz` **and** `www.mandalanetwork.xyz`
3. Set `www` to redirect to the apex (or the reverse - but pick one and keep it, because
   every canonical URL in the HTML points at `https://mandalanetwork.xyz/` with no `www`)
4. Add the DNS records Vercel shows you at the registrar. Propagation is usually minutes.

If the apex is kept as canonical, no change to the HTML is needed. **If you decide `www` is
canonical instead**, search and replace `https://mandalanetwork.xyz/` with
`https://www.mandalanetwork.xyz/` across `index.html`, `event-intelligence.html` and `sitemap.xml`.

---

## 4. Post-deploy checklist

Run through this on the live URL before telling anyone the site is up.

- [ ] Homepage loads, cover image sharp, wordmark set in Playfair Display
- [ ] Headings render in Newsreader, body copy in Source Serif 4, small caps in Archivo
      (if any of these fall back to a system serif, a `.woff2` failed to upload - check `/assets/fonts/`)
- [ ] `https://mandalanetwork.xyz/event-intelligence` resolves **without** `.html` in the URL
      (this depends on `"cleanUrls": true` in `vercel.json`)
- [ ] On that page, the three event tabs (Token2049 / Devcon Mumbai / EthCC) switch panel,
      background image and the 0X / 03 counter
- [ ] The four footer **Events** links land on the Upcoming Events block, not the top of the page
- [ ] No horizontal scrolling at 1440px, 820px and 390px wide, on **both** pages
- [ ] FAQ items open and close; only one open at a time
- [ ] Every link in section 5 below opens the right destination
- [ ] `https://mandalanetwork.xyz/robots.txt` and `/sitemap.xml` both return 200

Then submit the sitemap in Google Search Console and Bing Webmaster Tools.

---

## 5. Link inventory - verify each one on the live site

**Header**

| Label | Destination |
|---|---|
| About | `#about` |
| Capabilities | `#capabilities` |
| Case Studies | `#case-studies` |
| Event Intelligence | `/event-intelligence` |
| Get In Touch | `mailto:gkaur@mandalanetwork.xyz` |

**Body**

| Label | Destination |
|---|---|
| Discover your next market (cover) | `https://calendar.app.google/TS7tr275A8UCxBD6A` |
| Find out how you could tackle India during DevCon Mumbai (about) | `https://form.typeform.com/to/qvrQfqQo` |
| Ask us what your entry is missing (case study) | `https://calendar.app.google/TS7tr275A8UCxBD6A` |
| Luma (events) | `https://luma.com/v0fimew1` |
| Read more on our Event Intelligence capabilities | `/event-intelligence` |
| Cook with us at DevCon 8 Mumbai 2026 | `https://form.typeform.com/to/qvrQfqQo` |
| Get featured before your competitors do (magazine) | `https://t.me/Gurnamann` |
| Find out how you could tackle India during DevCon Mumbai (FAQ 2) | `https://form.typeform.com/to/qvrQfqQo` |
| Lemur Labs | `https://www.lemurlabs.net?utm_source=mandalanetwork&utm_medium=referral&utm_campaign=community_magazine` |
| Article card 1 | `https://x.com/Bitcoin_Bee/status/2057023679683346862` |
| Article card 2 | `https://www.linkedin.com/feed/update/urn:li:ugcPost:7488511325384527872/` |
| Article card 3 | `https://x.com/Bitcoin_Bee/status/2087832054557782315` |

**Event Intelligence page**

| Label | Destination |
|---|---|
| Discover your next market (cover) | `https://calendar.app.google/TS7tr275A8UCxBD6A` |
| Find out how we use event intelligence for your market access | `https://form.typeform.com/to/qvrQfqQo` |
| Host a side event at DevCon 8 Mumbai 2026 | `https://form.typeform.com/to/qvrQfqQo` |
| Talk to us on Telegram (Token2049 and EthCC panels) | `https://t.me/MandalaNetwork` |
| Tell us about your event (Devcon Mumbai panel) | `https://form.typeform.com/to/qvrQfqQo` |
| Cover nav - About / Capabilities / Case Studies | `/#about`, `/#capabilities`, `/#case-studies` |
| Footer Events (all four) | `#upcoming-events` (same page) |

**Contact block**

| Label | Destination |
|---|---|
| Book an introductory call | `https://calendar.app.google/TS7tr275A8UCxBD6A` |
| Brief us on an event | `https://t.me/MandalaNetwork` |
| Write to us | `mailto:gkaur@mandalanetwork.xyz` |

**Footer**

| Column | Label | Destination |
|---|---|---|
| Services | Market access | `#capabilities` |
| Services | Event intelligence | `/event-intelligence` |
| Services | Market entry guidance | `#capabilities` |
| Services | Educational content | `#capabilities` |
| Events | Token2049 Singapore | `/event-intelligence#upcoming-events` |
| Events | DevCon Mumbai | `/event-intelligence#upcoming-events` |
| Events | EthCC Cannes 2027 | `/event-intelligence#upcoming-events` |
| Events | Side Events Calendar | `/event-intelligence#upcoming-events` |
| Elsewhere | Writing on X | `https://x.com/Bitcoin_Bee` |
| Elsewhere | LinkedIn | `https://www.linkedin.com/company/mandala-network-group/` |
| Elsewhere | Telegram | `https://t.me/MandalaNetwork` |

---

## 6. Notes on the Event Intelligence page

`event-intelligence.html` shares the home page's cover and contact/footer, and carries two
sections of its own: the Event intelligence capabilities card and the Upcoming Events switcher.

- The filename matters: `"cleanUrls": true` is what turns it into `/event-intelligence`.
- The Upcoming Events block carries `id="upcoming-events"`; four footer links on each page target
  that anchor. Don't rename it.
- Its cover nav points back at the home page with absolute anchors (`/#about`, `/#capabilities`,
  `/#case-studies`), which is what makes cross-page navigation work. Leave the leading `/`.
- Both pages load the same `site.css` and `site.js`, so a change to either affects both.

---

## 7. Things not to do

- Do not add a build step, a framework, or a bundler.
- Do not move `assets/` or rename anything inside it - every path in the HTML and CSS is absolute
  (`/assets/...`) and will break.
- Do not delete `vercel.json`; without `"cleanUrls": true` the Event Intelligence links 404.
- Do not re-point font loading at Google Fonts. The fonts are deliberately self-hosted: faster
  first paint, one less third party, and no visitor data leaving the domain (relevant for
  EU and Monaco visitors).
- Do not re-compress `assets/img/*.webp`; they are already at their target quality.
