# CM Dashboard - Stage 1

A chart-led Government of Kerala executive portal covering the ten Stage 1 modules.

## Executive dashboard

The main dashboard foregrounds the nine requested views:

1. Income
2. Expenditure
3. Budget & Utilization
4. Investments & Business
5. Disaster Monitoring
6. Grievance & Feedback Monitoring
7. Health
8. Indira Guarantees
9. Dream Projects

It includes KPI cards and interactive financial, investment, disaster, grievance, health, guarantee, and project charts.

## Detailed modules

1. Planspace (Plan Expenditure)
2. Non-Plan Expenditure
3. Budget (Income / Revenue)
4. K-SWIFT
5. e-Health
6. KSRTC
7. Economics & Statistics
8. Disaster Management
9. CMO
10. Mission Samudra

Every module has its own KPI cards, trend and comparison charts, executive reading, and supporting data table.

## Data basis

- Dashboard figures are demonstration values carried over from the existing main portal.
- They illustrate the intended dashboard experience and are not presented as a current operational feed.
- The Chief Minister is the only minister role.
- Secretary views remain available, including **S Suhas IAS** as IT Secretary.

## Technology

- Next.js 16.4.6
- React / React DOM 19.3.1
- TypeScript 5.9
- Recharts 3.11.0
- Lucide React 1.76.0
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

- `/dashboard` - executive dashboard and Stage 1 module directory
- `/modules/[slug]` - chart-led module dashboard
