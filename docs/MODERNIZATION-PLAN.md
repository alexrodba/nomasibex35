# No Más IBEX 35 — Modernization plan (October 2026)

Goal of the site: help people in Spain find alternatives to IBEX 35 companies, and
earn referral income where possible (covers hosting, the rest is donated).

Decisions already taken (from the Q&A on 2026-10-11):

| Topic       | Decision |
|-------------|----------|
| Framework   | Stay on Gatsby (already on 5.16.1 / React 18 as of commit `20c7fe8`) |
| Content     | Full refresh: update IBEX 35 lists, re-verify existing alternatives, fill the 5 empty sectors |
| Referrals   | None exist today; research programs, build the plumbing, add links as they are approved |
| Hosting     | GitHub Pages, custom domain `nomasibex35.com` (no `pathPrefix`) |
| Analytics   | GA4 via gtag, with a consent banner (AEPD rules) |
| Design      | Keep the Forty look; modernize CSS, images, components |
| Listing bar | Tiered: list any non-IBEX option, tag each (cooperativa, B Corp, renovable, banca ética, local, multinacional, afiliado) |
| Languages   | Spanish (default, `/`) + Catalan (`/ca/`) |
| Author      | Anonymous project; suggestions via GitHub Issues |

> **Verification note.** The two research agents that were gathering the current IBEX 35
> composition and the referral programs died with the previous session. The content
> tables in Phase 4 and 5 are from my own knowledge (cut-off mid-2026) and are marked
> "verify". Verifying them is the first task of those phases, not an afterthought.

---

## Status

| Phase | State | Notes |
|-------|-------|-------|
| 1 Deploy pipeline | Live (2026-10-12) | PR #1 merged; Pages via Actions; custom domain `nomasibex35.com` (apex canonical, `www` redirects); certificate approved, HTTPS enforced. DNS at GoDaddy (Netlify account closed). During propagation stale resolvers caused an apex/www redirect loop that cleared once caches expired. Domain verified in GitHub Pages (TXT `_github-pages-challenge-alexrodba` in GoDaddy; keep it). |
| 2 Tech cleanup | Done (2026-10-12) | GA4 loaded by hand after consent instead of the gtag plugin (so nothing reaches Google before "Aceptar"). Image pipeline installed but wiring to `gatsby-plugin-image` deferred to Phase 3, where pages become data-driven. Lighthouse/a11y pass on tiles also moved to Phase 3. `/cookies/` page added early because the banner links to it. |
| 3 Content model + i18n | Done (2026-10-12) | YAML data + hand-rolled es/ca routing, Catalan slugs, hreflang, legacy-URL redirect pages, markdown legal pages (sobre, transparencia, aviso legal), directory with tag filter, build-time validation. Images now go through gatsby-plugin-image. |
| 4 Content refresh | Done (2026-10-12) | IBEX list verified against the Sep 2026 CAT review (no changes since Jul 2024; next review 10 Dec 2026). 9 existing alternatives re-checked (warnings on HolaLuz, Parlem, Triodos; Euskaltel tagged `multinacional`). 55 new companies across all sectors, es + ca, no photos yet (placeholder initial). "Otros" shows an explanatory note instead of alternatives. Research reports: `research-ibex.md`, `research-alternatives.md` (session scratchpad; key facts are in the YAML). Catalan reviewed by Àlex (Linear PRI-406, done 2026-10-14). |
| 5 Referrals | Registry done, applications pending | 19 programmes registered in `referrals.yaml`, all `researching`. Only 7 are real affiliate programmes (Awin: Simyo, Back Market; Tradedoubler: Ouigo; N26, Revolut/Impact, bunq/Everflow, CrowdFarming/FlexOffers). The rest are personal invite codes whose terms usually forbid public use: do not publish. Awin needs a NIF, bank account and a refundable 5 € deposit. Payouts go to the owner personally (see Decisions below). |
| 6 Maintenance | Done (2026-10-12), first manual run 2026-10-14 | `link-check.yml` (monthly lychee over the built site, opens/updates an issue), `content-reminders.yml` (IBEX review issue on 12 June / 12 December; monthly stale-company issue from `scripts/stale-companies.js`), Dependabot. Both run by hand on 2026-10-14: `LINK_CHECK_ISSUE` = 16 (rolling broken-links issue); set `STALE_CHECK_ISSUE` once the stale check opens its first issue (none stale yet). Labels `mantenimiento` and `enlaces-rotos` created (the IBEX job fails without them). |

**Post-launch (2026-10-12):** new favicon (struck-through "35", SVG + ICO + app icons); per-sector social images in es/ca (`npm run og`); schema.org JSON-LD (WebSite, Organization, ItemList of companies); sector-tinted initials for companies without photos; Lighthouse mobile now ≥ 95 on every category for all pages tested (home was 80 performance / 90 accessibility); unused grid and box styles removed.

**Photos + attribution (2026-10-12):** all 64 companies now have a photo. The 55 new ones come from Wikimedia Commons with free licences only (CC0, public domain, CC BY, CC BY-SA), credited and linked on each card; `npm run photo -- <slug> "File:…"` adds more. Every outgoing link to a recommended company carries UTM parameters (`utm_source=nomasibex35`, `utm_medium=referral`, `utm_campaign=<sector>`, `utm_content=<page>-<cta|name>-<locale>`); approved affiliate links are left untouched.

**Decisions (2026-10-12, later):** affiliate payouts go to the owner personally; no anonymisation (repo stays under the personal account); legal notice and transparency pages are hidden for now (files kept with `hidden: true`, restore by deleting that line). LSSI art. 10 requires identifying the site owner once affiliate income starts: revisit then. Every company list carries a general accuracy / not-financial-advice disclaimer. The three housing co-ops use photos from their own websites (credited and linked; remove if a co-op objects). Catalan review done (Linear PRI-406, 2026-10-14).

---

## 0. Where the repo stands today

Audit of `master` at `20c7fe8`:

**Already done**
- Gatsby 2 → 5.16.1, React 16 → 18.3, `node-sass` → `sass`, Prettier 3. `gatsby build` passes with no warnings on Node 24.

**Still 2020 starter cruft**
- `gatsby-plugin-google-analytics` with a Universal Analytics ID (`UA-165357813-1`). UA stopped collecting in July 2023. The site has had zero analytics for three years.
- `gatsby-plugin-react-helmet` + `react-helmet`. Gatsby 5 has a built-in Head API; the plugin is dead weight.
- `gatsby-plugin-offline` registers a service worker. For a site whose value is *current* links, a SW that serves stale pages is a liability.
- `gatsby-plugin-manifest` still says `gatsby-starter-default` / purple theme.
- Template leftovers: `src/pages/elements.js` (421 lines of demo), `src/pages/generic.js`, `Contact.js` (fake address in Nashville), `Footer.js` (© Untitled, `#` social links), `.github/FUNDING.yml` pointing at the template author's Ko-fi, README is the starter's README, `humans.txt`.
- `<a href="javascript:;">` in Header/Menu (a11y and React warnings), class components with `setTimeout` loading hack.
- SCSS: `skel`, `ie8`, `ie9`, Font Awesome 4 webfonts (6 font files), Google Fonts loaded via `@import url(...)` (render-blocking, GDPR-questionable). All `@import`, which Dart Sass deprecates.
- Images: 4.6 MB of raw JPEGs imported directly (`som.jpg` alone is 671 KB), no responsive variants.
- `package-lock.json` is in `.gitignore` but present on disk. CI builds will not be reproducible.
- 8 near-identical `Banner*.js` components and 8 near-identical sector pages with content hardcoded in JSX. Every content edit is a code edit.
- Home has a "Ver todas las empresas" button that links to `/`.
- Suggestions go to a Typeform (`nomasibex35.typeform.com/to/XCgczW`) — status unknown, verify.
- Alternatives list is from April 2020. Known problems: Euskaltel is now part of MasOrange, Bankia no longer exists, Siemens Gamesa and Mediaset are no longer listed, etc. (details in Phase 4).
- No sitemap, robots.txt, canonical URLs, Open Graph, hreflang, or structured data.
- DNS for `nomasibex35.com` currently resolves to two AWS Frankfurt IPs (`35.157.26.135`, `63.176.8.218`). Find out what host that is (Netlify is not, these look like a VPS or an old host) before repointing.

**Gatsby risk, stated once.** Gatsby is in maintenance mode under Netlify. 5.16.1 (Feb 2026) is a bug-fix release; `engines` says Node `>=18 <26`. It is fine for a static content site today. The plan below keeps the dependency surface minimal and puts all content in YAML so a future move to Astro or similar is a template rewrite, not a content migration.

---

## 1. Target architecture

```
src/
  data/
    sectors.yaml            # 8 sectors: slug, names {es,ca}, tagline {es,ca}, hero image, ibex companies
    ibex35.yaml             # the 35 constituents, sector, lastVerified (updated June/Dec after each rebalance)
    companies/*.yaml        # one file per alternative (see schema below)
    referrals.yaml          # referral program registry: company, program, status, url, disclosure text
    i18n/es.yaml, ca.yaml   # UI strings
  templates/
    sector.js               # /energia/, /ca/energia/ …
    directory.js            # /empresas/ – all alternatives, filter by sector/tag
    page.js                 # legal pages from markdown: aviso-legal, cookies, transparencia, sobre
  components/
    Layout, Header, Menu, Footer, Banner (one, parametrized), CompanyCard, TagBadge,
    AffiliateLink, ConsentBanner, LanguageSwitcher, Seo (Head API)
gatsby-node.js              # reads YAML, creates es + ca pages for each sector/page
static/CNAME                # nomasibex35.com
```

Company schema (`src/data/companies/som-energia.yaml`):

```yaml
slug: som-energia
name: Som Energia
sector: energia
website: https://www.somenergia.coop
ownership: cooperativa          # cooperativa | pyme | mutua | fundacion | multinacional
parent: null                    # e.g. "MasOrange" — anything owned by an IBEX company is rejected at build time
tags: [cooperativa, renovable, local]
description:
  es: "Cooperativa de consumo de energía verde sin ánimo de lucro…"
  ca: "Cooperativa de consum d'energia verda sense ànim de lucre…"
cta:
  url: https://www.somenergia.coop/es/hazte-socio-a/
  referral: null                # key into referrals.yaml when a program exists
image: som.jpg
imageCredit: "Photo by … on Unsplash"
lastVerified: 2026-10-11
```

`gatsby-node.js` validates: every `parent` must not appear in `ibex35.yaml`; every `referral` key must exist in `referrals.yaml`; `lastVerified` older than 12 months fails the build with a list (forces the periodic review).

**i18n approach: hand-rolled, not `gatsby-plugin-react-i18next`.** That plugin's last release is Dec 2022 (v3.0.1, pinned to i18next 22 / react-i18next 12). It works on Gatsby 5 but is unmaintained. With ~10 page types and ~40 companies, generating `/x` and `/ca/x` from `createPages` with a `locale` in page context, plus a `t()` helper over two YAML files, is about 80 lines and has no dependency risk. Each page emits `<link rel="alternate" hreflang>` for both locales plus `x-default`.

**Referral links.** `AffiliateLink` renders `<a rel="sponsored nofollow noopener" target="_blank">`, appends a visible "enlace de afiliado" label, and fires a GA4 `affiliate_click` event with company + sector. Spanish law (LSSI art. 20, Ley General de Publicidad, AUTOCONTROL guidance) requires commercial links to be identifiable as such; the label plus a `/transparencia` page listing all affiliate relationships and income use covers it.

**Analytics + consent.** `gatsby-plugin-google-gtag` with `anonymize_ip`, gtag Consent Mode v2 defaulting `analytics_storage` to `denied`, and a `ConsentBanner` with equally prominent *Aceptar* / *Rechazar* buttons (AEPD cookie guide, in force since Jan 2024). Choice stored in `localStorage`; `/cookies` page explains it. No cookies are set until accept.

---

## 2. Phases

Each phase ends in a PR to `master` and a deploy. Effort is for one person working in short sessions.

### Phase 1 — Deploy pipeline (first, so everything later ships) · ~half a day
1. Un-ignore and commit `package-lock.json`; add `.nvmrc` = `22` and `"engines": {"node": ">=22 <26"}`.
2. `.github/workflows/deploy.yml`: on push to `master` → `npm ci` → `gatsby build` → `actions/upload-pages-artifact` (`public/`) → `actions/deploy-pages`. On PRs: build only.
3. `static/CNAME` with `nomasibex35.com`; repo Settings → Pages → source "GitHub Actions", custom domain, enforce HTTPS.
4. DNS: identify the current host behind the AWS IPs; then apex `A` → `185.199.108.153`–`111.153`, `www` CNAME → `alexrodba.github.io`. Decide canonical host (`nomasibex35.com`, redirect `www`).
5. Remove the template `.github/FUNDING.yml`; add Dependabot (npm, monthly, grouped).

### Phase 2 — Tech cleanup, same look · ~1–2 days
1. Replace `react-helmet` with a `Seo` component on Gatsby's Head API (title, description, canonical, OG, hreflang).
2. Replace `gatsby-plugin-google-analytics` with `gatsby-plugin-google-gtag` + `ConsentBanner` (above). You supply the GA4 Measurement ID.
3. Remove `gatsby-plugin-offline` (and add the unregister step so existing visitors drop the old SW).
4. Fix manifest: name, colours, icon; add `gatsby-plugin-sitemap`, `static/robots.txt`.
5. Delete `elements.js`, `generic.js`, `Contact.js`, template README, `humans.txt`; write a real README and Footer (project description, GitHub link, "Sugerir una empresa" → GitHub issue template, legal links).
6. Convert to function components; drop the `is-loading` timeout hack; replace `javascript:;` anchors with buttons.
7. SCSS: migrate `@import` → `@use`; drop `skel`, `ie8/9`, Font Awesome; self-host Source Sans 3 via `@fontsource` (no Google Fonts request); keep the Forty layout/colours.
8. Images: `gatsby-plugin-image` + `gatsby-plugin-sharp`; sector heroes via `StaticImage`/`GatsbyImage` with WebP/AVIF; resize sources to ≤1600px before committing. Expect ~4.6 MB → <800 KB.
9. Accessibility pass: tiles are empty `<Link>`s over an `article`; make the whole article the link with real text. Alt text everywhere. Lighthouse ≥ 95 on all four categories as the acceptance check.

### Phase 3 — Content model + i18n · ~2 days
1. Create the YAML files; move the existing 9 companies and 8 sectors into them (Spanish only at first).
2. `gatsby-node.js`: load YAML (`gatsby-source-filesystem` + `gatsby-transformer-yaml`), create sector pages, directory page, legal pages, for `es` and `ca`; build-time validation described above.
3. One `Banner`, one `CompanyCard`, `TagBadge`, `AffiliateLink`, `LanguageSwitcher`.
4. Redirects from old URLs (`/energy` → `/energia`, `/banking` → `/banca`, `/telcos` → `/telefonia`, `/realestate` → `/vivienda`, `/services` → `/servicios`, `/consumer` → `/consumo`, `/tourism` → `/turismo`, `/others` → `/otros`). GitHub Pages has no server redirects, so keep the old paths as tiny pages with `<meta http-equiv="refresh">` + canonical.
5. Catalan translation of UI strings, sector copy, legal pages, and company descriptions. (Machine-translate first, you review; several companies publish Catalan copy you can reuse.)

### Phase 4 — Content refresh · ~2–3 days of research and writing
Facts below are from memory; **verify each against bolsasymercados.es (IBEX composition) and the companies' sites before publishing.**

**4a. IBEX 35 as of late 2025/2026 (verify, especially June/Dec 2026 rebalances)**

| Site sector  | Constituents |
|--------------|--------------|
| Energía      | Acciona Energía, Enagás, Endesa, Iberdrola, Naturgy, Redeia (ex‑REE), Repsol, Solaria |
| Banca        | Banco Sabadell, Banco Santander, Bankinter, BBVA, CaixaBank, Unicaja |
| Telefonía    | Cellnex, Telefónica |
| Vivienda/Infra | Acciona, ACS, Ferrovial, Inmobiliaria Colonial, Merlin Properties, Sacyr |
| Servicios    | Indra, Mapfre, Logista |
| Consumo      | Inditex, Puig, Fluidra |
| Turismo      | Aena, Amadeus, IAG |
| Otros        | Acerinox, ArcelorMittal, Grifols, Laboratorios Rovi |

Changes vs the site's 2020 lists: **gone** — Bankia (absorbed by CaixaBank 2021), Siemens Gamesa (delisted 2023), Mediaset España (merged into MFE 2023), Técnicas Reunidas, CIE Automotive, ENCE, Viscofan, Meliá Hotels (out 2024). **New** — Unicaja, Acciona Energía, Solaria, Sacyr, Logista, Puig, Fluidra, Rovi. **Renamed** — Red Eléctrica → Redeia. Note that BBVA's bid for Sabadell (2024–2025) may have changed the banking list; check.

**4b. Status of the 9 alternatives currently listed**

| Company | Status (verify) | Action |
|---------|-----------------|--------|
| HolaLuz | Independent, listed on BME Growth; losses and refinancing in 2024–25 | Keep, tag `pyme`, mention it is listed; check referral programme |
| Som Energia | Cooperative, healthy | Keep, flagship |
| EnergÉtica | Cooperative (Castilla y León) | Keep |
| Fiare Banca Etica | Cooperative bank, fine | Keep |
| Caixa d'Enginyers | Cooperative, fine | Keep |
| Triodos Bank | Independent; Dutch; depositary-receipt saga 2020–23 hurt reputation | Keep, tag `multinacional`, `banca ética` |
| Digi | Romanian multinational (DIGI Communications), now a top Spanish operator with own fibre | Keep, tag `multinacional`; it has a "trae un amigo" scheme, verify |
| Euskaltel | Bought by MásMóvil 2021, now MasOrange (Orange is not IBEX, but it is a large multinational) | **Replace** or move to tiered with `multinacional` tag and honest note |
| Parlem Telecom | Independent, Catalan, listed on BME Growth | Keep |

**4c. Candidates for the empty sectors** (shortlist, verify ownership and that they accept new customers)

- **Vivienda** (reframe from "inmobiliarias" to housing): Sostre Cívic, La Dinamo, Entrepatios, other cooperativas en cesión de uso; Housfy (pyme) for buy/sell; note Idealista (private equity) and Fotocasa (Adevinta) as "not IBEX but multinational".
- **Servicios / seguros**: Arç Cooperativa, CAES, Seguros Lagun Aro, Pelayo (mutua), Mutua Madrileña (mutua); mobility: Som Mobilitat, Cooltra.
- **Consumo**: Consum (coop), Eroski (coop), Bonpreu/Esclat, Veritas, Ametller Origen, Abacus, Mercado Social / Opcions, Ecoalf, Back Market (multinacional, affiliate programme).
- **Turismo**: Fairbnb.coop, Ecotur, Rusticae, trains over flights (Renfe, Iryo, Ouigo — label Ouigo as SNCF), Alsa (National Express, multinacional).
- **Otros**: hard to give consumer alternatives to steel and pharma. Recommendation: rename to **Medios** (press alternatives to the IBEX-adjacent media: El Salto, La Marea, CTXT, Crític, elDiario.es, Público) or drop the sector. Decide in Phase 4.

**4d. Pages to write**: `/sobre` (what the site is, who runs it: anonymous, how to contribute), `/transparencia` (affiliate list, income, donations), `/aviso-legal`, `/cookies`, GitHub issue template "Sugerir una empresa".

### Phase 5 — Referral programmes · ongoing, ~1 day to set up
1. Build `referrals.yaml` with columns: company, programme type (public affiliate / network / invite‑a‑friend code / none), network (Awin, Tradedoubler, Impact, Admitad), status (`researching`, `applied`, `approved`, `rejected`, `none`), payout, link, disclosure.
2. Apply. Expected landscape (verify): invite-a-friend codes at HolaLuz, Octopus Energy España, Digi, Finetwork, Pepephone (MasOrange, exclude), N26/Revolut/Bunq (multinational neobanks), MyInvestor; affiliate networks for Back Market, Ecoalf, Iryo/Ouigo/Renfe (Awin/Tradedoubler); **none** for cooperatives (Som Energia, Fiare, Consum…) which is fine and is the point of the tiered model.
3. Most networks accept a content site with a privacy policy and legal notice; some want a legal entity or invoicing capability. Anonymous project + donations needs a decision: who invoices? Flag for you.
4. Until a link is approved, the CTA is the plain signup URL with `utm_source=nomasibex35`.

### Phase 6 — Keep it alive · recurring
- GitHub Actions cron (monthly): `lychee` link check over `public/` → opens an issue on broken links (referral links rot fast).
- Calendar reminders after IBEX rebalances (June, December): update `ibex35.yaml`.
- `lastVerified` build gate (12 months) forces a yearly look at each company.
- Dependabot grouped monthly; pin Node 22 until Gatsby declares Node 24.

---

## 3. Decisions on the open questions (2026-10-12)

1. **GA4 Measurement ID** — live since 2026-10-13 (`G-ES2VYCZZCE`, repository variable `GATSBY_GA4_ID`). Loaded only after consent; page views come from GA4 enhanced measurement.
2. **Domain** — registered at GoDaddy or cdmon (to confirm when doing the DNS cut-over). The AWS IPs are whatever the old host was; they stop mattering once DNS points at GitHub Pages.
3. **Invoicing entity for affiliate payouts** — deferred to Phase 5.
4. **"Otros" sector** — stays as is: the bucket for IBEX constituents that fit no other sector. Alternatives there are "where applicable".
5. **Catalan** — machine-translated, reviewed by Àlex (done 2026-10-14).
6. **Typeform replacement** — free alternative. Phase 2 adds a GitHub issue template ("Sugerir una empresa"), which costs nothing and keeps suggestions public. For people without a GitHub account, a Tally form (free, unlimited responses) can be added later; Àlex creates the Tally account.

## 4. Suggested order of PRs

1. `deploy-pipeline` (Phase 1)  
2. `tech-cleanup` (Phase 2)  
3. `content-model-i18n` (Phase 3)  
4. One PR per sector for Phase 4 (small, reviewable, each one ships)  
5. `referrals` plumbing (Phase 5)  
6. `maintenance-automation` (Phase 6)
