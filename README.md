# CM Governance Dashboard — Government of Kerala.

Real-time governance command centre for the Chief Minister, built with **Next.js 16 (App Router, Turbopack) + React 19.2 + Tailwind v4**, Framer Motion, Recharts and react-leaflet (Kerala district choropleths driven by the supplied `kerala.geojson`).

> Research-preview dashboard. Finance, Revenue, and Budget use official reports and labelled copies of those reports. Other modules include seeded demonstration data.

## Run locally

```bash
# from this folder r
npm install        # first run downloads dependencies (see RUN_WINDOWS.md if you hit a lightningcss error)
npm run dev        # http://localhost:3000
```

Open `http://localhost:3000` → pick a role on the login screen → land on **Kerala Today**.

> Note: a leftover empty `node_modules/` folder may exist. If `npm install` misbehaves, delete it first: `rmdir /s /q node_modules` (Windows) then `npm install`.

Build for production:

```bash
npm run build && npm start
```

## What's built in this wave (Foundation + Showpieces)

| Area | Route | Notes |
|------|-------|-------|
| Login | `/` | Govt of Kerala identity, 11 roles incl. CM VD Satheeshan, live status, 25/35/14 panel |
| Kerala Today | `/dashboard` | Hero command panel, 9 executive KPIs, CM priority queue, Indira panel, fiscal pulse, district choropleth, sector chart, delayed projects, social issues, alerts, systems health, RAG ticker |
| Chief Minister Dashboard | `/dashboard-cm` | CM command view with guarantees, a CAG fiscal summary, districts, projects, decisions and alerts |
| Finance Command | `/finance` | CAG actuals, spending coverage, annual accounts and dated status-paper figures |
| Revenue Command | `/revenue` | CAG provisional actuals lead; income-head actuals, sources, periods and timestamps are shown per item; FY 2026-27 estimates remain a small reference |
| Budget Command | `/budget` | CAG expenditure actuals, searchable expenditure heads, annual accounts and labelled estimate references |
| Indira Guarantees | `/indira` | Overall score, ₹16,996 Cr/yr, 6 priority cards, 14-district heatmap, beneficiary journey, trend charts, risk board, secretary-response panel |
| 6 Guarantee pages | `/indira/[slug]` | **Pixel-faithful** recreations of each impact infographic + CM governance layer (RAG, owner, source, fund flow, journey, drill-down, review ticket) |
| TV Live Wall | `/tv` | Single-viewport, rotating panels, big district risk grid, controls, large RAG ticker. Press the maximize button to cast |

The remaining sections (Districts, Projects, Health, Calamity, Grievances, Social, Files, Modules, Systems, Inbox, Tickets, Reports, Transformation, Governance, Risk, Public…) retain seeded or prototype data where an official source is not connected. The shared engine — RAG model, universal drill-down drawer, and Create-Review-Ticket modal — powers them.

## Fiscal data and provenance

- **CAG Kerala accounts:** `/api/cag-kerala-accounts` retrieves the linked *Government of Kerala Accounts at a Glance* workbook for actuals through 30 June 2026. These values are unaudited and provisional. The workbook's own budget column is retained only as a small, source-specific reference and is not mixed with Kerala Budget Portal denominators.
- **Kerala Budget Portal:** `/api/kerala-budget` retrieves Source of Income, Source of Expenditure, Budget at a Glance, overall-position history, and revenue-composition history. Its FY 2026-27 Budget Estimates are labelled **BE** and never presented as actuals.
- **Saved official copies:** both adapters expose the source period, available update timestamp and check time. The pages label bundled fallback data as a saved official copy.
- **Fiscal status paper:** verified treasury, arrears, borrowing, KIIFB, PSE, plan and inclusion figures carry their period, basis and original report links.
- **Unreported actuals:** official revenue and expenditure heads without matching actuals show **Actual awaiting data** with the expected Finance Department source.

Official actuals lead. Budget and Revised Estimates appear in smaller references or in the estimates tab.

### Cross-cutting features live now
- **Universal drill-down drawer** — opens from KPIs, fiscal cards, map districts and guarantees (State→District→Block→Scheme).
- **Create Review Ticket modal** — from any "Send for Review" / ticket action, with priority, assignee, response type and context panel.
- **Kerala choropleth maps** — real `kerala.geojson`, heat-shaded, click-to-drill.
- **Live RAG news ticker** + live clock throughout.

## Structure

```
src/
  app/
    page.tsx                 # Login
    (app)/layout.tsx         # AppShell (sidebar, topbar, ticker, overlays)
    (app)/dashboard          # Kerala Today
    (app)/dashboard-cm       # CM command dashboard
    (app)/finance            # Fiscal command and DSS
    (app)/revenue            # Actual-first income view
    (app)/budget             # Actual-first expenditure view
    (app)/indira             # Indira command + [slug] detail pages
    (app)/<section>          # placeholder pages (next waves)
    tv/                      # TV Live Wall (no shell)
  components/                # AppShell, KeralaMap, charts, primitives, Overlays, GuaranteeDashboard
  data/                      # source snapshots, fiscal/status-paper records, and seeded modules
  hooks/                     # official fiscal-source client hooks
  lib/                       # source adapters, fiscal DSS, UI helpers
  store/ui.ts                # zustand UI state (drawer, ticket modal, role)
public/kerala.geojson        # Kerala districts
```
