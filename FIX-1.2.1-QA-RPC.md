# PlantMaster Control Center v1.2.1 — QA RPC-only Access

## Root cause

QA Lab loaded its first summary through a security-definer RPC but then queried `qa_environments`, `qa_test_runs`, `qa_test_results` and `qa_manual_checks` directly from the browser. Those direct reads could fail with table-level permission errors even for a displayed super administrator.

## Fix

The browser now uses only administrator-validated security-definer RPCs:

- control_qa_overview
- control_qa_environment_runs
- control_qa_run_detail
- control_update_manual_check

No QA table is read directly by admin.js.

## Deployment

1. Run `backend/schema-phase12d-qa-rpc-access.sql` once.
2. Replace `index.html`, `admin.js`, `admin.css`, `admin-v1.1.css`, and `service-worker.js` in the separate plantmaster-admin repository.
3. Close/reopen the Control Center and refresh once.

No customer app or Edge Function update is required for this access fix.
