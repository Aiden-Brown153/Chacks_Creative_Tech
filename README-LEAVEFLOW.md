# LeaveFlow

A web-based Leave Management System built as part of a Work Integrated Learning (WIL) programme at Chacks Creative Technologies.

**Deadline:** 30 June 2026
**Supervisor:** Siphihle Dlamini
**Team Lead:** Aiden Brown

## Team Structure

**Frontend** — led by Luke Moran
Developers: Zimi Vuza, Aiden Mc Carter, Uyathandwa Vuza, Owen Meiring
Stack: React + Tailwind CSS

**Backend** — led by Nandipha Tazvivinga
Developers: Phila Mchunu, Simphiwe Mngomezulu, Lawson Mpofu, Khabir Rampersad, Asande Shange
Stack: Node.js + Express + PostgreSQL + JWT + Nodemailer

## Repository Structure

```
LeaveFlow/
├── frontend/        React application (see frontend/README.md)
├── backend/         Express API (see backend/README.md)
├── docs/            Shared documentation, including the API contract
└── raw-screens/     Temporary staging for unconverted HTML screens (dev branch only)
```

## Branching Strategy

Single branch: everyone works on `main`.

A few ground rules to keep this from causing chaos with 12 people pushing to the same branch:

- **Pull before you push, every time.** `git pull` first, or you'll create conflicts you didn't need to.
- **Stay in your own lane.** Backend devs only touch files inside `backend/`, frontend devs only touch files inside `frontend/`. Don't edit someone else's in-progress file unless you've talked to them.
- **Commit often, in small chunks.** A five-line commit is easy to merge around. A 500-line commit dumped at the end of the day is not.
- **If you break something, say so immediately** in Discord. A broken `main` blocks everyone, so silence makes it worse, not better.

## Getting Started

See `frontend/README.md` and `backend/README.md` for setup instructions specific to each part of the app.
