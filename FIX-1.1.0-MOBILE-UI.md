# PlantMaster Control Center v1.1.0 — Mobile Navigation & Distinct UI

## Fixed

- Android/browser Back follows Control Center route history.
- Back closes an open administrator modal before changing pages.
- Back from a filtered company/usage/complaint view returns to the previous route.
- Every Dashboard summary tile is a touch button and opens its module.
- Company lifecycle counts open filtered Company Management.
- Quick Actions open the corresponding modules.
- Dashboard alerts open Complaints or Incidents.
- Dashboard reduced to six primary counters plus grouped lifecycle, quick actions and alerts.

## New visual identity

- Light administrative workspace instead of the customer app's dark industrial interface.
- Navy administrator header/sidebar.
- White data panels and tables.
- Indigo/cyan administrator accent colors.
- Compact command-center dashboard.
- Larger touch targets and responsive mobile grids.

## Deployment

Replace only `index.html`, `admin.js`, `admin.css`, `admin-v1.1.css`, and `service-worker.js` in the separate `plantmaster-admin` repository. No SQL or Edge Function update is required.
