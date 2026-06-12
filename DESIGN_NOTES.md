# HiPrimal Redesign — Audit & Build Notes

Redesign of `index.html` (deployed at hiprimal.vercel.app). Previous version backed up at
`index-conversion-v3.backup.html`.

---

## STEP 1 — AUDIT of previous page (commit 123b716)

### Section inventory (old page, in order)

1. Announcement bar — "60-Day Money-Back Guarantee + Free Shipping"
2. Sticky header — gradient-dot logo, **5** nav links, "Buy Now" pill, separate mobile menu
3. Hero — bg photo (hero-banner.jpg), H1 "You're not lazy. You're depleted.", 4 check bullets
4. "What is it" (#what) — 3 alternating image/text rows
5. Reviews (#reviews) — dark section, 1 creator video, 3 text quotes, star ratings
6. How it works (#how) — 3-step emoji timeline
7. Why HiPrimal — 6-row comparison table (✓/✗ glyphs)
8. Offer (#offer) — buy box with Subscribe & Save toggle + 3 packs → Shopify cart permalink
9. Ingredients (#ingredients) — Supplement Facts panel + organ list
10. FAQ (#faq) — 6 items + aside with 3 images hotlinked from hiprimal.com CDN
11. Final CTA — full-width magenta gradient band
12. Footer — 4 columns, newsletter stub, FDA disclaimer
13. Sticky mobile buy bar

### CTA inventory (old page)

| CTA | Target | Problem |
|---|---|---|
| Header "Buy Now" | #offer | ok |
| Hero "Try HiPrimal Risk Free →" | #offer | no price shown |
| Row 1 "See Reviews →" | #reviews | points **away** from buy path |
| Row 2 "Try It →" | #offer | ok |
| Row 3 "How It Works →" | #how | points **away** from buy path |
| Reviews "Try HiPrimal" | #offer | ok |
| Buy box "Continue to Secure Checkout" | Shopify cart permalink | ok (kept) |
| Final band "Try HiPrimal →" | #offer | ok |
| Nav "Contact" | **#faq** | fake link — there is no contact section |
| **Mobile menu** "Shop" | **#ingredients** | wrong target (desktop nav went to #offer) |

### Unverifiable / non-compliant claims (all removed)

- "4.9/5 from 3,000+ verified reviewers" — no review platform behind it; brand is new
- 3 × "✓ Verified buyer" text quotes (Rachel M., Dani K., Monica R.) — not backed by any platform
- Quote "My iron numbers are finally normal" — implied treatment claim
- "exact mix of nutrients your hormones need to stay **balanced** … smoother **cycle**" — hormone-balancing claim
- "Most women feel a shift in energy within 2 weeks" — unverifiable stat stated as fact
- `<title>`: "100% Natural **Super Supplement**" — hype
- Creator video labeled "✓ TikTok creator" with no gifted/paid disclosure
- "COA on request" — weak vs. linking the actual documents

### Copy voice inconsistencies

- Footer: "Join the Tribe", "drops, recipes, and **ancestral wisdom**" vs. clinical tone elsewhere
- Reviews: "Real Women, Real Results" + star spam vs. the calm FAQ voice
- FAQ: jokey asides ("no hard feelings", "'retention specialist' phone call") vs. clinical-warm target
- Subscribe & Save 15% — placeholder number, no subscription app behind it (removed entirely)

### Visual inconsistencies

- Palette was magenta/pink (#EC0A78) with **gradients** on buttons, logo, timeline spine, final band — off the warm-editorial spec; backgrounds were pure white `#FFFFFF`
- Emoji icons in timeline (⚡ 🌙 ✨); ✓/✗ text glyphs used as icons everywhere
- Fonts: Archivo Black display + Hanken Grotesk — no editorial serif
- Mixed image sources: local assets + 3 images hotlinked from hiprimal.com CDN (FAQ aside) + video hotlinked from Shopify CDN (local copy existed in /assets)
- Duplicate nav structures (desktop links vs. mobile menu) with mismatched targets
- Dead CSS: full cart-drawer styles with no drawer markup; `.ph` placeholder system unused
- `hiprimal-pouch.png` shipped as 1.8 MB PNG (now compressed JPEG)

---

## STEP 2 — Design system (new page)

- Tokens in `:root`: bone `#F4EEE1` bg / cream `#FBF7ED` paper / warm ink `#221C17` / oxblood `#5E1B21` accent. No gradients, no pure white, no pure black.
- Type: **Fraunces** (high-contrast editorial serif, headlines) + **Inter** (body/UI), Google Fonts.
- Buttons: **sharp** (0 radius) everywhere. Primary = oxblood fill / cream text; secondary = ink outline.
- Icons: inline SVG line icons only (24px grid, `stroke="currentColor"`). Zero emojis sitewide.
- Max content width 1200px; consistent `--space-section` rhythm.

## Placeholders / items that need real assets before launch

- **COA PDFs**: `/assets/coa/heavy-metals.pdf`, `microbiology.pdf`, `identity-purity.pdf` are
  **generated placeholders** — replace with real lab reports and update batch labels in the Lab
  Results section (currently "Batch 001").
- **Founder section**: uses first frame of `assets/hiprimal-lyn.a2172f7f.mp4` (real asset from the
  live site). Founder copy is **placeholder, marked with an HTML comment** — needs Lyn's real words.
- **Reviews**: Judge.me widget is **stubbed** (`<div id="judgeme-widget">`) — install the platform
  and drop the embed in. The two creator videos are real assets, now labeled **"Gifted"**.
- **Email capture**: front-end only (shows a confirmation message) — wire to Klaviyo/Shopify Forms.
  The "10% off your first order" code must actually exist.
- **Discount codes** `PACK3` / `PACK6` must exist in Shopify admin for multipack pricing to apply
  at checkout (cart permalinks pass `?discount=`).
- **pasture.jpg** reads as alpine Europe, not Argentina — fine as texture, but replace with real
  sourcing photography when available. `woman-pouch.jpg` shows two different pouch designs
  (magenta in hand, purple on floor) — crop in use hides the floor pouch at most sizes; replace
  with a final-packaging shoot eventually.
- Policy links point to the live store's real pages (hiprimal.com/policies/…).
