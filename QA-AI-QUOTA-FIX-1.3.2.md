# PlantMaster QA AI Quota/Finalization Fix v1.3.2

## Diagnosis

The English and Urdu combined solver tests reached Google Gemini but Google returned HTTP 429 `RESOURCE_EXHAUSTED`. This is external provider quota exhaustion, not a PlantMaster permission or combined-search code defect. Condition Analyzer succeeded before the remaining quota was exhausted.

## Accounting repair

`finalize_ai_request` could not infer the old partial unique index during `ON CONFLICT(request_id)`, leaving usage events in `reserved`. Phase 13 replaces it with a normal unique index, reliably finalizes completed/failed requests, refunds failed provider reservations, writes `ai_usage`, and reconciles stale reservations.

## QA classification

QA Runner v1.3.2 classifies Gemini 429/quota/rate-limit responses as `blocked` instead of application failures. Actual code/auth/RLS errors remain failures. Reports display Blocked separately with the full provider error.

## Deployment

1. Run `backend/schema-phase13-ai-finalization.sql` once.
2. Replace Control Center `index.html`, `admin.js`, `admin.css`, `admin-v1.1.css`, and `service-worker.js`.
3. Replace/redeploy `edge-functions/qa-runner/index.ts`; legacy JWT verification stays OFF.
4. Do not rerun AI tests until Gemini quota is available or billing/quota is increased.
