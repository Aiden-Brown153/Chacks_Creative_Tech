# LeaveFlow — Leave Management System

**Programme:** SD-WM01 / SD-WM02 — Work Integrated Learning (WIL)
**Company:** Chacks Creative Technologies
**Supervisor:** Casper Swanepoel
**Team Lead:** Aiden Brown
**Delivery Deadline:** 30 June 2026

---

## Project Overview

LeaveFlow is a web-based Leave Management System developed as the primary WIL deliverable for the SD-WM01 and SD-WM02 cohorts. The system allows employees to submit leave requests, managers to approve or reject them, and administrators to view reports and analytics — all through a browser-accessible interface.

---

## Team Structure

| Name | Role | Area |
|---|---|---|
| Aiden Brown | Team Lead | Overarching coordination, authentication, hosting |
| Luke Moran | Frontend Lead | Frontend coordination and development |
| Nandipha Tazvivinga | Backend Lead | Backend coordination and notifications |
| Zimi Vuza | Frontend Developer | Frontend screens |
| Aiden Mc Carter | Frontend Developer | Frontend screens |
| Uyathandwa Vuza | Frontend Developer | Frontend screens |
| Owen Meiring | Frontend Developer | Version control and frontend screens |
| Phila Mchunu | Backend Developer | Employee profile management |
| Simphiwe Mngomezulu | Backend Developer | Approval workflow |
| Lawson Mpofu | Backend Developer | Database and API layer |
| Khabir Rampersad | Backend Developer | Leave request handling |
| Asande Shange | Backend Developer | Reporting and analytics |

---

## Technology Stack

| Area | Technology |
|---|---|
| Frontend Markup | HTML |
| Frontend Styling | CSS |
| UI Design Reference | Figma |
| Backend Language | Python |
| Backend Framework | Django |
| Database | MySQL |
| Authentication | JWT (JSON Web Tokens) |
| Email Notifications | SendGrid API |
| Version Control | GitHub |

---

## Repository Structure

```
LeaveFlow/
├── frontend/         # All frontend HTML/CSS screens (see frontend/README.md)
├── backend/          # All backend Django modules (see backend/README.md)
└── README.md         # This file
```

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready, tested, deployed code only |
| `frontend` | Integration branch for all frontend work |
| `backend` | Integration branch for all backend work |
| `frontend/<task>` | Individual frontend feature branches |
| `backend/<module>` | Individual backend module branches |

No code is committed directly to `main`. All work goes through feature branches, is reviewed by the relevant lead, and merged into the integration branch before final merge to `main`.

---

## Current Development Status

| Area | Status |
|---|---|
| Requirements gathering | ✅ Complete |
| Figma prototype design | ✅ Complete |
| Technology stack agreed | ✅ Complete |
| GitHub repository setup | ✅ Complete |
| Team roles assigned | ✅ Complete |
| Backend module planning | ✅ Complete |
| Frontend screen planning | ✅ Complete |
| Backend feature branches | 🔄 In progress |
| Frontend feature branches | 🔄 In progress |
| Frontend screen development | 🔄 In progress |
| Backend module development | 🔄 In progress |
| Frontend–backend integration | ⏳ Upcoming (14–22 June) |
| Testing and QA | ⏳ Upcoming (23–25 June) |
| Deployment | ⏳ Upcoming (26–27 June) |
| Final presentation | ⏳ 29–30 June |

---

## Delivery Timeline

| Dates | Phase | Focus |
|---|---|---|
| 11–20 June | Development | Frontend screens and backend modules built independently |
| 14–22 June | Integration | Frontend connects to backend API endpoints |
| 23–25 June | Testing | End-to-end workflow testing, defect fixing |
| 26–27 June | Deployment | Final code deployed to hosting, live link confirmed |
| 29–30 June | Presentation | Live demo and final evidence submission |

---

## Core System Workflow

```
Employee logs in (JWT auth)
  → Submits leave request (dates, type, reason)
    → Manager reviews and approves/rejects
      → Email notification sent via SendGrid
        → Leave status updated and visible to employee
          → Reporting dashboard updated for admin view
```

---

## Expected Deliverables

- [ ] Functional Leave Management System (browser accessible)
- [ ] GitHub repository with regular commits from all team members
- [ ] Deployment link (live hosted system)
- [ ] Testing evidence (test cases, defect log, screenshots)
- [ ] Final presentation slides and demo script
- [ ] Individual contribution evidence for WIL assessment

---

## Setup Instructions

> Full setup instructions will be added here during the deployment phase (26–27 June).
> Each sub-folder contains its own README with environment-specific setup steps.

See `frontend/README.md` for frontend setup.
See `backend/README.md` for backend setup, API documentation, and database configuration.
