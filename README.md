# CM Dashboard - Stage 1

A focused Government of Kerala portal for the ten Stage 1 service modules confirmed in the CM Dashboard discussion.

## Included modules

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

## Content boundary

- The portal uses only the module scope, API availability, and integration actions documented for Stage 1.
- No live API is connected in this version.
- No KPI values, API endpoints, sample datasets, refresh times, or departmental field schemas are fabricated.
- Planspace is the only module with explicitly named sub-modules in the source requirements.
- Upload and data-entry surfaces are shown only where an alternative intake path was explicitly requested. They are interface placeholders and do not submit data.
- The Chief Minister is the only minister role. Secretary views remain available, including the IT Secretary role for S Suhas IAS.
- The main dashboard foregrounds nine requested views: Income; Expenditure; Budget & Utilization; Investments & Business; Disaster Monitoring; Grievance & Feedback Monitoring; Health; Indira Guarantees; and Dream Projects.
- Those views link to the ten confirmed source modules only where documented scope exists. Indira Guarantees remains a confirmation-needed placeholder. Grievance & Feedback has no confirmed Stage 1 source; CMO is presented only as a related integration. Mission Samudra is the documented Dream Projects link, while broader portfolio scope remains pending.

## Technology

- Next.js 16.4.6
- React / React DOM 19.3.1
- TypeScript 5.9
- Lucide React 1.76.0
- Plain responsive CSS

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production check

```powershell
npm run typecheck
npm run build
npm start
```

## Main routes

- `/dashboard` - Stage 1 overview, search, filters, and integration register
- `/modules/[slug]` - module overview, data readiness, and integration plan

