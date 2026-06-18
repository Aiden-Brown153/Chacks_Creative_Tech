# LeaveFlow — API Contract

This document is the single source of truth for what each backend endpoint expects and returns. Update it whenever an endpoint's shape changes — frontend should be building against this, not against guesses.

Status key: `Planned` | `In Progress` | `Done`

---

## Auth

### POST /api/auth/login
**Status:** Planned
**Request body:**
```json
{ "email": "string", "password": "string" }
```
**Response:**
```json
{ "token": "string", "user": { "id": "string", "name": "string", "role": "employee | hr_manager" } }
```

---

## Leave Requests

### GET /api/leave-requests
**Status:** Planned
Returns leave requests for the logged-in user (or all, if HR manager).

### POST /api/leave-requests
**Status:** Planned
**Request body:**
```json
{ "startDate": "YYYY-MM-DD", "endDate": "YYYY-MM-DD", "reason": "string", "type": "string" }
```
**Response:**
```json
{ "id": "string", "status": "pending", "submittedAt": "ISO date string" }
```

### PATCH /api/leave-requests/:id
**Status:** Planned
Used by HR Manager to approve/reject. **Request body:**
```json
{ "status": "approved | rejected", "comment": "string (optional)" }
```

---

## Employee Profile

### GET /api/employees/:id
**Status:** Planned

### PUT /api/employees/:id
**Status:** Planned

---

## Reporting / Analytics

### GET /api/reports/leave-summary
**Status:** Planned
Returns aggregated data for the HR dashboard charts.

---

## Notes for contributors

- Add new endpoints here **before** building them, or as soon as you start, so frontend isn't blocked guessing.
- If you change a response shape after frontend has already built against it, flag it in Discord immediately — don't just change it silently.
