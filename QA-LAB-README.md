# PlantMaster QA Lab v1.2.0

## Purpose

Creates two isolated QA organizations and seven temporary role accounts, seeds representative operational records, runs server-backed multi-role regression tests, records evidence, exports reports, tracks physical-device checks and safely cleans up only registered QA data.

## Deployment

1. Run `backend/schema-phase12-qa-lab.sql` after Phase 11c.
2. Replace the Control Center runtime files from this release.
3. Deploy `edge-functions/qa-runner/index.ts` as `qa-runner`.
4. Turn legacy JWT verification OFF for `qa-runner`; the function validates the administrator JWT and `qa.manage` authority internally.
5. Open Control Center → QA Lab.

## Automated coverage

- Seven role-account authentication
- Cross-company isolation
- Viewer read/write restrictions
- Technician asset/work writes
- Owner-role escalation protection
- Owner invitation protection
- Atomic simultaneous spare issue
- Atomic simultaneous tool checkout
- Owner complaint submission and worker rejection
- Plan summary
- Storage reservation and oversized-file rejection
- Suspended-company write protection
- Optional English/Urdu combined Gemini
- Optional condition-analysis Gemini

## Manual/physical checks recorded

- QR camera
- Document OCR camera
- Microphone/sound test
- Phone vibration
- Android Back
- CSV/Excel/Word/PDF downloads
- PWA offline/reconnect
- Email/WhatsApp invitations

## Cleanup safety

Cleanup requires the exact phrase `DELETE QA ENVIRONMENT`. It verifies both the QA registry row and `__PM_QA` organization-name prefix. It refuses non-QA organizations. It removes QA Storage paths, QA organizations and temporary QA Auth users while retaining the QA run/evidence record with organization references cleared.

Do not use production records or real personal email addresses in QA tests. Optional AI tests consume the QA company's Gemini quota and may incur provider cost.
