# OwlDid Design Principles

A two-colour, three-font studio system. Copy these rules into any new build to get the same look out of the box.

---

## 1 · Colour

**Two colours. That's it.**

| Token | Hex | Role |
|-------|-----|------|
| `--sage` | `#c0d0c0` | Page background · text on navy · accent fill on navy |
| `--navy` | `#030B11` | Dark sections · text on sage · accent fill on sage |

Everything else is one of these two, plus alpha. No greys, no off-blacks, no accent colours, no gradients.

### Computed surfaces

```css
--sage-2: #b3c5b3;   /* pressed sage */
--sage-3: #d2dfd2;   /* raised sage (cards on sage) */
--navy-2: #061524;   /* raised navy (cards on navy) */
--navy-3: #0d2035;   /* deepest navy */
```

### Text on each surface

```
on sage  →  navy             (primary)
            rgba(navy, 0.62) (body)
            rgba(navy, 0.38) (muted)
            rgba(navy, 0.18) (placeholder)

on navy  →  sage             (primary)
            rgba(sage, 0.62) (body)
            rgba(sage, 0.38) (muted)
            rgba(sage, 0.16) (placeholder)
```

### Borders

Always derived from the opposite colour at low alpha — `rgba(navy, 0.10)` on sage, `rgba(sage, 0.10)` on navy. Never use a third colour for borders.

### Section rhythm

Alternate sage and navy sections. Never put two navy or two sage sections back to back — strict alternation *is* the boundary between sections, there is no other divider.

```
Hero (navy) → Clients (sage) → Work (navy) → Services (sage)
→ Why-us (navy) → Tabs (sage) → Stats (navy) → Team (sage)
→ Testimonials (navy) → FAQ (sage) → Contact (navy) → Footer (navy)
```

The one permitted same-colour adjacency is Contact → Footer (both navy): the footer is a bookend, not a section. Form-style pages (form, survey, contact) may run one continuous navy surface — a doc-header above its form is a single section split across two tags, not two sections.

Each section is also a **rounded panel that nests over the one before it** (`border-radius: 32px 32px 0 0` + a `-32px` top margin). The curved seam reveals the previous surface, so every section reads as its own self-contained panel and none can blend into the next.

### What red used to do — and what we do instead

Most studio systems rely on an accent colour (orange/red) for CTAs and emphasis. We don't have one. Emphasis comes from:
- **Italic script** (Romanesco) for accent words inside Inter headlines
- **Inverted colour** for primary CTAs (navy button on sage, sage button on navy)
- **Size and weight contrast** between display Inter 800 and Fragment Mono 13px

---

## 2 · Typography

**Three fonts. Each with one job. No overlap.**

| Font | Role | Weights | Sizes | Tracking |
|------|------|---------|-------|----------|
| **Inter** | Everything UI — display headlines, body, buttons, labels | 400 / 500 / 600 / 700 / 800 | 11–156px | `-0.055em` at display, `-0.01em` at body |
| **Fragment Mono** | Tiny labels — eyebrows, captions, form labels, footer meta | 400 | 11–13px | `0` |
| **Romanesco** | Wordmark + emphasis word inside Inter headlines | 400 only | 22–280px | `-0.005em` |

### Type scale

```css
.h-display   clamp(56px, 9vw, 132px)   Inter 800   line 0.92
.h-1         clamp(40px, 5.5vw, 76px)  Inter 800   line 0.96
.h-2         clamp(30px, 4vw, 52px)    Inter 700   line 1.02
.h-3         22px                       Inter 600   line 1.20
.lead        18px                       Inter 400   line 1.55
.body        16px                       Inter 400   line 1.60
.eyebrow     13px                       Fragment Mono · with • dot before
```

### The Romanesco rule

Romanesco only appears in two places:
1. **The brand wordmark** — "Owldid." next to the owl mark in nav and footer
2. **The `<em>` word inside an Inter headline** — e.g. *"Websites that **did** the job."*

Romanesco at body sizes is illegible — never use it under 18px.

### Letter-spacing matters

Heavy Inter at large sizes *must* have negative tracking. Without it, the type looks like a settings screen, not a brand.

```
56px+   →  -0.045em
30–55px →  -0.030em
20–29px →  -0.020em
under   →  -0.010em (or 0 for mono)
```

---

## 3 · Layout

### Grid container
```css
max-width: 1320px;
padding: 0 32px;   (20px on mobile)
margin: 0 auto;
```

### Section padding
```css
.section      96px 0   (72px on mobile)
.section-sm   48px 0
.section-lg   140px 0  (96px on mobile)
```

### Gaps
- Card grids: **16–18px**
- Inside a card: **22–28px**
- Section internal spacing: section-head sits **64px** above content

### Cards

```
on sage  →  background var(--sage-3), radius 24px, no border
on navy  →  background var(--navy-2), radius 24px, no border
```

No drop shadows. Depth comes from surface stacking — a `--sage-3` card on a `--sage` background, one tonal step apart.

### Radii

```css
--r-sm:   10px   /* small chips */
--r-md:   16px   /* form inputs */
--r-lg:   24px   /* cards, sections */
--r-xl:   32px   /* hero corners, footer top */
--r-pill: 999px  /* buttons, nav, eyebrows, tags */
```

Every section is a rounded panel: it carries `border-radius: 32px 32px 0 0` and a `-32px` top margin so it nests over the section before it. The hero sits flush (`border-radius: 0`) as the base of the stack; the footer closes it with the same `32px 32px 0 0`. This is the "card-everywhere" feel taken to the section scale.

---

## 4 · Components

### Nav

Floating pill, fixed `top:16px left:16px right:16px`, `max-width:1280px`.

```css
background: rgba(navy, 0.86);
backdrop-filter: blur(16px) saturate(140%);
border-radius: 999px;
```

**On scroll:** `top` shrinks to 12px, `max-width` shrinks to 980px. Animate both with `transition: 0.3s ease`.

Inside the pill: logo (img + Romanesco wordmark) — pill-grouped Inter links — sage CTA pill on the right.

**Mobile:** Burger button (40px circle) — opens a fullscreen navy overlay with Romanesco 48px links stacked vertically and the CTA fixed at the bottom.

### Banner above nav

```css
position: fixed; top: 0;
background: var(--navy);
color: var(--sage);
font-family: Fragment Mono;
font-size: 12px;
text-align: center;
padding: 6px 16px;
```

Always sits *behind* the floating nav. Keep it short — one line, no emoji.

### Buttons

```
pill-navy   navy bg + sage text     →  primary CTA on sage
            sage bg + navy text     →  primary CTA on navy (auto-inverts in .bg-navy)
outline     transparent + 1px border
```

All pill-shaped (`radius: 999px`). Hover lifts 1px and darkens 1 tone.

### Hero

- Navy background, sage text
- Eyebrow chip (Fragment Mono) → massive headline (Inter 800 + Romanesco em) → 19px Inter sub → two CTAs → trust strip
- Right side: a person/video card (`aspect-ratio: 4/5`) with grayscale image, dark gradient bottom-tint, name + role + small "Let's talk" pill

### Marquee

Inter 700 30px brand names + sage/navy dots between + Fragment Mono stat phrases. Animates `transform: translateX(-50%)` over 60s. JS duplicates content once for a seamless loop.

### Client logo strip

6 tiles, `sage-3` background, brand-name text 17px Inter 700. Hover inverts to navy/sage. Acts as a logo wall when actual logos aren't available.

### Work bento

3-column grid. First and fourth cards span 2 cols (`.wide`). Each card:
- 280px tall image (real photo, **grayscale 0.4 + brightness 0.85**)
- Sage stat pill top-right (Fragment Mono 13px)
- Body: tag pills, Inter 700 26px title, 14px description
- Bottom-right arrow circle that rotates -45° + fills sage on hover
- Whole card lifts 4px and image goes full-colour + 1.04× zoom on hover

### Why-us

Two-card row: massive `152px` Inter 800 stat number on the left, 5-star rating block on the right. Below, three "→ pillar" bullets in navy cards.

### Services (4-col)

Each card:
- Fragment Mono 001/002/003/004
- Inter 700 28px title
- 14px description
- Tag pills
- Pill CTA at the bottom

**Hover flips the entire card to navy** — title, text, tags all invert. This is the signature interaction.

### Stats counter

Dark navy block, 4 columns split by vertical lines. Each stat:
- Inter 800 88px with Romanesco unit suffix at 0.65em
- Fragment Mono 13px label below

Numbers animate from 0 on scroll with `IntersectionObserver` over 1.4s with `easeOutCubic`.

### Team grid

4-column grid (down to 1 col on mobile). Each tile:
- `aspect-ratio: 4/5`
- Image grayscale + 1.02 contrast
- Bottom gradient fade to navy
- Name + role in the bottom-left, sage arrow circle in the bottom-right
- **Hover:** image goes full-colour + 1.05× zoom, arrow rotates -45°

One slot is replaced by a sage-3 CTA card with "Apply now" — same shape and size as a team tile.

### Testimonials

Sage-3 cards, large Romanesco `"` quote mark at the top, 19px Inter quote text, name + role + avatar circle (initials, navy background) below.

### FAQ

Single-column list, `1px` top border per item.
- Question: Inter 600 24px
- Toggle: 38px sage-tinted circle with "+" — rotates 45° to become "×" when open, fills navy
- Answer: 16px Inter at 0.62 alpha, animates with `max-height` transition

### Contact form

Sage-on-navy in a dark `navy-2` card with `24px` radius.
- Labels: Fragment Mono 12px
- Inputs: `rgba(sage, 0.06)` background, 1px border, focus-border = sage
- Submit: sage pill with navy text, full-width

### Footer

Navy with `border-radius: 32px 32px 0 0` (matches hero's bottom radius).

4 columns at the top — brand + tagline, services, company, contact.

Then a **massive `clamp(80px, 18vw, 280px)` Romanesco-mixed wordmark** spanning the page. This is the visual exit point.

Bottom row: copy left, location-meta right, both Fragment Mono 12px.

---

## 5 · Imagery

### Photos

All photos get **grayscale + slight brightness drop** at rest, full colour on hover.

```css
filter: grayscale(0.4) contrast(0.95) brightness(0.85);
transition: filter 0.5s ease, transform 0.6s ease;
/* on hover */
filter: grayscale(0) contrast(1) brightness(1);
transform: scale(1.04);
```

For portraits (team, founder), start at `grayscale(1)` so the full-colour reveal is dramatic.

### Where to source

Unsplash CDN URLs work without auth:
```
https://images.unsplash.com/photo-{id}?w=800&q=80&auto=format&fit=crop
```

For Kenyan / African business context, search portrait IDs that look like real local professionals rather than stock-photo Caucasian boardrooms.

### Video

Use Pexels public CDN for hero videos — same grayscale + colour-on-play treatment. Pair with a navy tint overlay so text stays readable.

### No icons, no illustrations

We don't use icon libraries. Symbols come from:
- The owl mark (PNG, brand only)
- ASCII glyphs: `→` `+` `×` `★` `·`
- A small circle dot before eyebrows

That's it.

---

## 6 · Motion

### Scroll reveal

Every section's content uses `.reveal`:
```css
opacity: 0; transform: translateY(28px);
transition: opacity 0.8s ease,
            transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
```

IntersectionObserver adds `.in` with **60ms stagger between sibling elements**. Threshold `0.12`, rootMargin `0 0 -8% 0` so it triggers slightly before the element enters frame.

### Counter animations

Numbers count up from 0 on intersection — 1.4s, `easeOutCubic`. Only animate once.

### Hover transitions

- Cards lift `translateY(-4px)` in `0.3s`
- Buttons lift `translateY(-1px)` in `0.15s`
- Photo grayscale → colour in `0.5s ease`
- Arrow rotates `-45deg` in `0.3s`
- FAQ toggle rotates `45deg` over `0.3s`

### Marquee

60s linear infinite. Duplicate the track content in JS for seamless looping.

### What never animates

- No parallax
- No fade-in-on-page-load splash
- No autoplaying carousels
- No scroll-jacking

---

## 7 · Spacing & rhythm

- Section head → content gap: **64px**
- Card → card gap: **16–18px**
- Inside a card: **22–28px**
- Form field gap: **16px**

Vertical rhythm follows an 8px grid loosely. Don't sweat 4px deviations — composition reads better than spreadsheet precision.

---

## 8 · Anti-patterns

Never do these:

- ❌ Pure white `#ffffff` — cards on sage are `sage-3`, not white
- ❌ Pure black — text on sage is `navy`
- ❌ A third colour — no orange, no red, no blue accent
- ❌ Drop shadows — depth comes from surface layering
- ❌ Gradients — flat surfaces only (one exception: the bottom image-tint over photos)
- ❌ Borders heavier than 1px — most are `0.5px` or low-alpha
- ❌ Romanesco below 18px or inside body copy
- ❌ Inter for the wordmark — that's Romanesco's only display moment
- ❌ Fragment Mono for headlines — it's a label font, never a display font
- ❌ Two adjacent sections of the same colour (sage→sage or navy→navy) without a navy/sage card between
- ❌ Emoji in the navbar banner or footer ("🔥" looks like a flash sale)
- ❌ Icon libraries — symbols come from ASCII glyphs only
- ❌ Coloured stat numbers — stats are always sage on navy or navy on sage
- ❌ Auto-playing video with sound
- ❌ Parallax, scroll-jacking, or splash intros

---

## 9 · File structure for a new build

```
project/
├── index.html (+ other pages — each is self-contained, sharing CSS/JS)
└── assets/
    ├── css/main.css         (all design tokens + components in one file)
    ├── js/main.js           (nav, scroll reveal, counters, FAQ, tabs)
    └── img/                 (brand logos + any local images)
```

Each HTML page imports the same 3 fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Romanesco&family=Fragment+Mono&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

---

## 10 · Naming

CSS variables follow the role/context pattern:

```
--<colour>            base
--<colour>-2 / -3     darker / lighter step
--on-<surface>        primary text on that surface
--on-<surface>-2/-3   secondary / muted text
--line-<surface>      border on that surface
--f-ui                Inter
--f-mono              Fragment Mono
--f-brand             Romanesco
--r-{sm|md|lg|xl|pill} radii
```

Class names are short, semantic, lower-case. Prefer `.card` `.svc-card` `.work-card` over BEM.

---

## 11 · Copy voice

Optional but worth mentioning since it ships with the design:

- Short sentences. Most under 15 words.
- Specific numbers, not adjectives. "150+ projects" not "many projects."
- Lead with the reader's problem, not your solution.
- "You" not "we" where possible.
- One CTA per section, never two competing.
- Lowercase brand wherever it appears in copy (the wordmark stays "Owldid.").

---

## 12 · Quick reference — the smallest possible page

```html
<body>
  <div class="nav-banner">…</div>
  <header class="nav">
    <div class="nav-inner">
      <a class="nav-logo">
        <img src="/owl-mark.png">
        <span class="nav-logo-text">Owldid<span>.</span></span>
      </a>
      <nav class="nav-links">…</nav>
      <a class="nav-cta">…</a>
      <div class="nav-burger"><span></span><span></span><span></span></div>
    </div>
  </header>
  <div class="nav-spacer with-banner"></div>

  <section class="hero">
    <div class="page-wrap">
      <div class="hero-pre">…eyebrow</div>
      <h1 class="hero-title">Big <em>thing</em> here<em>.</em></h1>
      <p class="hero-sub">…</p>
      <div class="hero-actions">
        <a class="pill-navy">Primary →</a>
        <a class="btn-outline-sage">Secondary</a>
      </div>
    </div>
  </section>

  <!-- alternate .bg-sage / .bg-navy sections -->

  <footer class="footer">…</footer>
</body>
```

That's the whole system. Two colours, three fonts, surface stacking, generous radii, one accent that's italic-script-not-colour, monochrome photography that warms on hover. Apply it consistently and you don't need anything else.
