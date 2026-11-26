# Chief Minister Dashboard - Stage 1

A chart-led Government of Kerala portal covering the ten first-stage modules.

## Main dashboard

The main page gives prominence to:

1. Income
2. Expenditure
3. Budget and utilisation
4. Investments and business
5. Disaster monitoring
6. Grievance and feedback monitoring
7. Health
8. Indira Guarantees
9. Dream Projects

It includes KPI cards, charts, departmental follow-up items, data-exchange fields and a source register.

## Detailed modules

1. Planspace (Plan Expenditure)
2. Non-Plan Expenditure
3. Budget (Income / Revenue)
4. Industries, KERA and K-SWIFT
5. Health
6. KSRTC - Priyadarshini
7. Economics and Statistics (EcoStat)
8. KSDMA / Disaster Management
9. CMO, Grievances and Feedback
10. Dream Projects / Mission Samudra

Planspace, EcoStat, Industries/KERA, Priyadarshini and KSDMA have dedicated data-rich dashboards. The remaining modules retain the existing CMO portal reference series until their agreed departmental feeds are connected.

The global CM review form retains the original workflow fields: related item, voice note, written instruction, secretary, department, priority, due date, expected response and attachments. Review entry points are available in the header and beside main review items and charts.

## Data basis

- Planspace uses the supplied source file generated on 23 November 2026.
- EcoStat uses the public Market Intelligence APIs, the published 2024-25 Quick Estimate for State income and the supplied November 2026 departmental reports. Daily 50-item, weekly 20-item, fruit retail, fruit wholesale, Market Intelligence, monthly/annual variation and CPI series remain separate by date and unit.
- Industries uses the Year of Enterprises public dashboard.
- KERA uses its official site, public scheme dashboard and approved programme framework.
- KSDMA uses dated daily bulletins and the department's routine and War Room reporting fields.
- Priyadarshini uses the official 2026 scheme and 97-day progress reports. The future-dated attachment is used only for information structure.
- The Chief Minister is the only minister role. Secretary views remain available, including S Suhas IAS as IT Secretary.

## Technology

- Next.js 16
- React 19
- TypeScript
- Recharts
- Lucide React
- Responsive CSS

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production checks

```powershell
npm run typecheck
npm run build
npm start
```

## Main routes

- `/dashboard` - Chief Minister Dashboard and module directory
- `/modules/[slug]` - detailed module dashboard
