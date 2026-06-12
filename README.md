# LeaveFlow — Backend

**Module:** SD-WM01 / SD-WM02
**Lead:** Nandipha Tazvivinga
**Team:** Phila Mchunu, Simphiwe Mngomezulu, Lawson Mpofu, Khabir Rampersad, Asande Shange

---

## Overview

This folder contains all backend code for the LeaveFlow Leave Management System. The backend is built with Python and Django, using MySQL for data storage, JWT for authentication, and SendGrid for email notifications. Each developer owns a dedicated module and works on their own feature branch.

---

## Current Task Status

- [x] Review the chosen design to understand what the backend needs to support
- [x] Break the system down into backend modules
- [x] Assign a module to each backend developer
- [x] Update the Task Assignments table with final assignments
- [x] Research document produced covering all modules, integration plan, and JWT flow
- [ ] Create a feature branch for each module off the `backend` branch
- [ ] Develop and commit each assigned module
- [ ] Submit pull request to `backend` branch for lead review
- [ ] Integration testing once all modules are merged

---

## Team & Task Assignments

| Name | Role | Module | Branch |
|---|---|---|---|
| Nandipha Tazvivinga | Backend Lead | Notifications & Alerts | `backend/notifications-alerts` |
| Phila Mchunu | Backend Developer | Employee Profile Management | `backend/employee-profile-management` |
| Simphiwe Mngomezulu | Backend Developer | Approval Workflow | `backend/approval-workflow` |
| Lawson Mpofu | Backend Developer | Database & API Layer | `backend/database-api-layer` |
| Khabir Rampersad | Backend Developer | Handling Leave Requests | `backend/leave-requests` |
| Asande Shange | Backend Developer | Reporting & Analytics | `backend/reporting-analytics` |

---

## Technology Stack

| Area | Technology |
|---|---|
| Language | Python |
| Framework | Django |
| Database | MySQL |
| Authentication | JWT (JSON Web Tokens) |
| Notifications | SendGrid API |
| Version Control | GitHub |

---

## Folder Structure

```
backend/
├── README.md                        # This file
├── requirements.txt                 # Python dependencies
├── manage.py                        # Django management script
├── leaveflow/                       # Main Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── authentication/                  # JWT auth (Aiden Brown / Lawson Mpofu)
├── employees/                       # Employee Profile Management (Phila Mchunu)
├── leaves/                          # Leave Request Handling (Khabir Rampersad)
├── approvals/                       # Approval Workflow (Simphiwe Mngomezulu)
├── notifications/                   # Notifications & Alerts (Nandipha Tazvivinga)
└── reports/                         # Reporting & Analytics (Asande Shange)
```

---

## Module Summaries

### Module 1 — Database & API Layer (Lawson Mpofu)
**⚠ Build this first — all other modules depend on it.**

Provides the central MySQL database schema and all REST API endpoints. Handles JWT token validation on every request.

**Deliverables:**
- Django models for: Employees, Departments, Roles, LeaveRequests, Approvals, Notifications
- REST API endpoints:
  - `POST /api/auth/` — login, returns JWT token
  - `GET/POST /api/employees/` — employee list and registration
  - `GET/PUT /api/employees/{id}/` — employee profile detail
  - `GET/POST /api/leaves/` — leave request list and submission
  - `GET/PUT /api/leaves/{id}/` — leave request detail and edit
  - `GET/PUT /api/approvals/` — approval list and status updates
  - `GET /api/reports/` — reporting data
- JWT middleware that validates the token on all protected endpoints

---

### Module 2 — Employee Profile Management (Phila Mchunu)

Manages employee accounts, profile data, department assignment, and leave balance tracking.

**Deliverables:**
- Employee registration logic
- Profile update functionality
- Department assignment
- Leave balance calculation and storage
- APIs: integrated into `/api/employees/` endpoints from Lawson's layer

---

### Module 3 — Leave Request Handling (Khabir Rampersad)

Manages the full lifecycle of a leave application from submission to cancellation.

**Deliverables:**
- Create leave request (validate required fields, validate leave balance)
- Edit leave request (while still pending)
- Cancel leave request
- Track leave history per employee
- On submission: trigger Approval Workflow and Notification modules
- APIs: integrated into `/api/leaves/` endpoints

---

### Module 4 — Approval Workflow (Simphiwe Mngomezulu)

Controls the approval and rejection process by managers and HR.

**Deliverables:**
- Manager review view (list of pending requests)
- Approve / Reject action with status update
- Status values: `Pending`, `Approved`, `Rejected`, `Cancelled`
- On decision: trigger Notification module
- APIs: integrated into `/api/approvals/` endpoints

---

### Module 5 — Notifications & Alerts (Nandipha Tazvivinga)

Sends automated email notifications to employees, managers, and admins via SendGrid.

**Deliverables:**
- Django Signals to listen for leave submission, approval, and rejection events
- SendGrid API integration
- Notification types:
  - Leave submitted (to manager)
  - Leave approved (to employee)
  - Leave rejected (to employee)
  - Leave status update (to employee)

---

### Module 6 — Reporting & Analytics (Asande Shange)

Generates reports and dashboard statistics for management.

**Deliverables:**
- Leave utilisation report (per employee, per department)
- Approval statistics (approval rate, average turnaround)
- Employee leave history report
- Dashboard summary data (total leaves this month, pending count, etc.)
- APIs: integrated into `/api/reports/` endpoint

---

## JWT Authentication Flow

```
1. Employee/Manager submits credentials (email + password)
2. Django validates against the database
3. JWT token generated and returned to the frontend
4. Frontend stores token and sends it in every subsequent request:
   Authorization: Bearer <token>
5. Backend middleware validates the token before processing any request
6. Invalid or expired token → 401 Unauthorized response
```

---

## API Endpoints Reference

| Endpoint | Method | Description | Module Owner |
|---|---|---|---|
| `/api/auth/` | POST | Login — returns JWT token | Lawson |
| `/api/employees/` | GET, POST | List employees / register | Phila + Lawson |
| `/api/employees/{id}/` | GET, PUT | Employee profile and balance | Phila + Lawson |
| `/api/leaves/` | GET, POST | List leaves / submit request | Khabir + Lawson |
| `/api/leaves/{id}/` | GET, PUT, DELETE | Leave detail, edit, cancel | Khabir + Lawson |
| `/api/approvals/` | GET, PUT | Pending list / approve/reject | Simphiwe + Lawson |
| `/api/reports/` | GET | Reporting and dashboard data | Asande + Lawson |

---

## Branch Naming Convention

```
backend/database-api-layer
backend/employee-profile-management
backend/leave-requests
backend/approval-workflow
backend/notifications-alerts
backend/reporting-analytics
```

**To create your branch:**
```bash
git checkout backend
git pull origin backend
git checkout -b backend/<your-module-name>
```

---

## Pull Request Process

1. Complete your module on your feature branch.
2. Test your module independently before opening a PR.
3. Commit with clear messages, e.g. `Completed leave request validation and balance check`.
4. Push: `git push origin backend/<your-module-name>`
5. Open a pull request from your branch into `backend`.
6. Nandipha Tazvivinga reviews for code quality, security, API standards, and integration readiness.
7. Merge into `backend` after approval.

---

## Integration Testing Plan

Integration testing runs in phases once modules are merged into `backend`:

| Phase | Focus |
|---|---|
| Phase 1 | Database & API Layer — confirm all endpoints return correct responses |
| Phase 2 | Employee Profile — confirm registration and balance retrieval work via API |
| Phase 3 | Leave Requests — confirm submit, edit, cancel flows work end to end |
| Phase 4 | Approval Workflow — confirm manager approve/reject updates status correctly |
| Phase 5 | Notifications — confirm SendGrid emails are triggered at correct events |
| Phase 6 | Reporting — confirm dashboard data aggregates correctly |
| Phase 7 | Full end-to-end — Login → Submit → Approve → Notify → Reporting update |

---

## Development Timeline

| Dates | Task |
|---|---|
| 11–13 June | Lawson: database models and base API endpoints set up first |
| 11–20 June | All modules: develop on feature branches, commit regularly |
| 14–20 June | Feature branch PRs opened and reviewed by Nandipha |
| 14–22 June | Integration with frontend (API endpoints consumed by HTML screens) |
| 23–25 June | Integration testing, defect fixes |
| 26–27 June | Final merge to `main`, deployment |

---

## Backend Lead Responsibilities (Nandipha Tazvivinga)

- Architecture oversight across all six modules
- Code reviews on all pull requests before merge
- Branch management and PR approvals
- Ensuring API consistency across modules
- Security verification (JWT implementation, input validation)
- Coordinating integration with Luke Moran (Frontend Lead) during the integration phase
- Reporting blockers to Aiden Brown (Team Lead)
