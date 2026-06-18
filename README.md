# LeaveFlow — Frontend

**Module:** SD-WM01 
**Lead:** Luke Moran
**Team:** Zimi Vuza, Aiden Mc Carter, Uyathandwa Vuza, Owen Meiring

---

## Overview

This folder contains all frontend code for the LeaveFlow Leave Management System. The frontend is built in HTML and CSS, following the approved Figma prototype. Each screen is developed on its own feature branch and reviewed by Luke Moran before merging into the `frontend` branch.

---

## Current Task Status

- [x] Review the chosen design as a team
- [x] Break the design down into individual screens and components
- [x] Assign a task to each frontend developer
- [x] Update the Task Assignments table below with final screen assignments
- [ ] Create a feature branch for each assigned screen off the `frontend` branch
- [ ] Build and commit each assigned screen in HTML/CSS
- [ ] Submit pull request to `frontend` branch for lead review

---

## Team & Task Assignments

> Frontend Lead: fill in the Assigned Screen column once final screen assignments are confirmed with the team. Base assignments on the approved Figma prototype.

| Name | Role | Assigned Screen(s) |
|---|---|---|
| Luke Moran | Frontend Lead | Code review, branch management, and screen development, Employee Login, Employee SignUp, HR Login, HR Dashboard, HR Notifications, HR Records  |
| Zimi Vuza | Frontend Developer | Employee Dashboard, Employee Notifications, Review Accounts|
| Aiden Mc Carter | Frontend Developer | Submit Leave Request, Employee Leave History, Leave Requests |
| Uyathandwa Vuza | Frontend Developer | Empployee Balances, Employee Calender, Reports, HR Profile and Settings |
| Owen Meiring | Frontend Developer | no contact |
| Aiden Brown| Inbetween | Github, Employee Profile and Settings |
---

## Technology Stack

| Area | Technology |
|---|---|
| Markup | HTML |
| Styling | CSS |
| Design Reference | Figma |

---

## Folder Structure

```
frontend/
├── README.md              # This file
└── <screen-name>/
    └── index.html         # One folder per screen, named to match the branch
```

> Each developer creates their screen folder on their own feature branch. The exact folder names are determined by Luke Moran once screen assignments are finalised from the Figma prototype.
> Each Screen in Named. Folders/files should reflect that name

---

## Branch Naming Convention

Each screen is developed on its own feature branch created from `frontend`. Branch names should clearly reflect the screen being built.

```
frontend/<screen-name>
```

**To create your branch:**
```bash
git checkout frontend
git pull origin frontend
git checkout -b frontend/<your-screen-name>
```

---

## General Screen Requirements

All screens must meet the following standards regardless of which screen is being built:

- Matches the approved Figma prototype in layout and visual style
- Renders correctly in a browser with no console errors
- Uses a consistent CSS file shared across screens or a screen-specific stylesheet
- All interactive elements (buttons, forms, links) are present and functional in the UI
- Forms include basic HTML5 validation (required fields, correct input types)
- Placeholder data is acceptable during development — real data is connected during integration
- Committed to the correct feature branch with a clear, descriptive commit message

---

## How Frontend Connects to Backend

Once the backend API endpoints are live (from Lawson Mpofu's Database & API Layer module), each screen will make HTTP requests to the Django REST API. The integration phase runs 14–22 June.

The core API endpoints available for frontend integration are:

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/auth/` | POST | Login — returns JWT token |
| `/api/employees/{id}/` | GET | Retrieve employee profile and leave balance |
| `/api/leaves/` | GET, POST | List leave requests / submit a new request |
| `/api/leaves/{id}/` | GET, PUT | View or edit a specific leave request |
| `/api/approvals/` | GET | List pending requests for manager review |
| `/api/approvals/{id}/` | PUT | Approve or reject a leave request |
| `/api/reports/` | GET | Retrieve reporting and dashboard data |

All requests after login must include the JWT token in the request header:
```
Authorization: Bearer <token>
```

Luke Moran and Nandipha Tazvivinga (Backend Lead) coordinate directly during the integration phase to map each screen to its corresponding endpoint(s).

---

## Pull Request Process

1. Complete your screen on your feature branch.
2. Commit regularly with clear messages, e.g. `Add leave request form with date validation`.
3. Push your branch: `git push origin frontend/<your-screen-name>`
4. Open a pull request from your branch into `frontend`.
5. Luke Moran reviews for design consistency, code quality, and completeness before merging.

---

## Development Timeline

| Dates | Task |
|---|---|
| 11–12 June | Confirm screen assignments, create feature branches, set up folder structure |
| 15–20 June | Complete screen builds, commit to feature branches, open pull requests |
| 14–22 June | Integration with backend API (connect screens to live endpoints) |
| 23–25 June | Testing, fixes, and final commits |
| 26–27 June | Final merge to `main`, deployment preparation |
