# LeaveFlow — Frontend

React + Tailwind CSS application for LeaveFlow.

## Stack

- React
- Tailwind CSS
- Axios (API calls)
- Chart.js (reporting/analytics views)

## Folder Structure

```
src/
├── pages/
│   ├── employee/      Employee-facing screens
│   └── hr-manager/     HR Manager-facing screens
├── components/
│   └── layout/         Shared layout (navbar, sidebar, page wrapper)
├── api/                 Functions that call the backend API
└── assets/              Images, icons, fonts
```

## Setup

```
npm install
npm run dev
```

## Notes

Screen-to-page assignments will be added here once confirmed against the Figma prototype. Until then, work-in-progress screens can go directly into `src/pages/employee/` or `src/pages/hr-manager/` as rough drafts — clean them up as the Figma assignments firm up rather than staging them elsewhere.
