
## Goal
Build a complete, coherent homepage at `/` for CABO ENERGIA (Cape Verde solar) targeting homeowners (primary) and businesses (secondary), in European Portuguese with Cape Verdean register. Establish the brand design system first, then assemble the 6 homepage sections from those primitives.

## Part 1 — Design system foundation

**Brand tokens** (in `index.css` + `tailwind.config.ts`, all HSL):
- `--brand-green: 152 64% 22%` (#1A5C3A) — primary
- `--brand-green-deep: 155 56% 11%` (#0D2B1F) — hero overlay, dark surfaces
- `--brand-yellow: 45 95% 55%` — accent, CTAs
- `--surface: 0 0% 100%` / `--surface-muted: 80 12% 97%` (#F7F8F6)
- `--ink: 155 20% 12%` / `--ink-soft: 155 10% 35%`
- Typography utilities: `text-display` (clamp 2.75–4.5rem, tight), `text-headline` (clamp 1.75–2.75rem), `text-body-lg` (1.125rem), `text-overline` (0.75rem, uppercase, tracked)
- Pill radius token `--radius-pill: 999px`
- Shimmer keyframe for image placeholders
- `fade-in-up` reveal animation triggered via IntersectionObserver

**Reusable primitives** (in `/components/brand/`):
- `Navbar` — sticky, transparent over hero → solid on scroll, wordmark, anchor links (Soluções, Como funciona, Contacto), yellow CTA pill that opens the lead panel
- `PillButton` — variants: `primary` (yellow), `ghost-light` (translucent on dark), `ghost-dark` (outline green), sizes `md` / `lg`, optional icon slot
- `TrustBadge` — overline pill (light/dark variants)
- `SectionHeader` — overline + headline with left/center alignment
- `StatCard` — bento grid card (default / `accent` green+yellow CTA / `dark` for trust section)
- `SolutionCard` — icon, title, value prop, product list with "Mais escolhido" badge, CTA
- `ProcessStep` — numbered step with title + description, horizontal scroll-snap on mobile, connector line on desktop
- `ImagePlaceholder` — dark green fill with shimmer (TODO comment for real photography)
- `SlideOverPanel` — right-side panel built on shadcn `Sheet`, max-w 480px, brand-styled

**Lead form context**:
- `LeadPanelProvider` at app root exposing `openLeadPanel()` so any CTA opens the same panel
- `LeadForm` — 3 fields (Nome completo, Telemóvel, Tipo de cliente toggle), zod validation, Supabase insert, in-panel success state

## Part 2 — Supabase wiring (manual connect)

- `src/lib/supabaseClient.ts` reading `import.meta.env.VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, guarded warning if missing
- `supabase/migrations/0001_create_leads.sql` (NOT auto-applied):
  - `leads` table: `id uuid pk default gen_random_uuid()`, `name text`, `phone text`, `client_type text check in ('residencial','empresarial')`, `source text default 'website_homepage'`, `status text default 'new_lead'`, `created_at timestamptz default now()`
  - RLS enabled, single policy: anonymous `INSERT` allowed, no `SELECT`
- README note explaining env vars + migration steps

## Part 3 — Homepage assembly (`/components/sections/`)

1. **`HeroSection`** — `min-h-[100svh]`, `ImagePlaceholder` background + 160° green gradient overlay, left-aligned content (max-w-[680px]): TrustBadge "Energia Solar em Cabo Verde" → display headline "Cabo Verde não pode parar." → 520px subtext → CTA row (yellow "Pedir Estudo de Poupança" + ghost WhatsApp) → bottom row of 3 trust pills

2. **`PainSection`** — white bg, 2-column grid (text left / 2×2 bento right). 4th card uses brand green bg + yellow CTA. Text CTA scroll-anchors to `#solucoes`

3. **`SolutionsSection`** — `#F7F8F6` bg, `id="solucoes"`, centered SectionHeader, 2 `SolutionCard`s (Residencial / Empresarial) with "Mais escolhido" on Plus tiers, then horizontal row of 4 stat tiles (kWh/dia)

4. **`HowItWorksSection`** — white bg, centered header, 7 `ProcessStep`s in horizontal row on `lg+` (with connector), scroll-snap on mobile, footnote paragraph beneath

5. **`TrustSection`** — `#1A5C3A` bg, white text, yellow overline pill, 3×2 dark bento grid (6 RTB cards with yellow lucide icon accents: `Package`, `Clock`, `MapPin`, `ListChecks`, `ShieldCheck`, `Ship`)

6. **`FinalCtaSection`** — white bg, centered, headline + subtext + two large CTAs (yellow primary opens panel, ghost-green WhatsApp link)

**Footer** — minimal: wordmark, contact (WhatsApp + email placeholder), copyright

## Part 4 — Interaction & polish

- `useRevealOnScroll` hook (IntersectionObserver, threshold 0.15, once) for `fade-in-up` on each section wrapper
- All "Pedir Estudo de Poupança" buttons (hero, pain bento, final CTA, navbar) call `openLeadPanel()`
- WhatsApp CTAs link to `https://wa.me/238XXXXXXX` — `238` is the Cape Verde country code, `XXXXXXX` left as TODO comment for the real number
- Form validation messages in Portuguese; success state replaces form with checkmark + "Recebemos o seu pedido. Vamos contactá-lo em até 24 horas."
- Responsive verified at 375 / 768 / 1280: hero stacks CTAs, bento collapses to 1-col, process steps switch to scroll-snap

## Out of scope (per brief)
`/residencial`, `/empresarial`, `/como-funciona`, admin, blog, partners.

## Deliverable
A single coherent homepage. The user connects their Supabase project after by setting `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` and running the provided migration.
