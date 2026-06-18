# LeaveFlow — Backend

Express API for LeaveFlow.

## Stack

- Node.js + Express
- PostgreSQL
- JWT authentication
- Nodemailer (email notifications)

## Folder Structure

```
src/
├── routes/        URL endpoints — maps a route + method to a controller function
├── controllers/   Business logic for each route
├── models/         Data shape / schema definitions
├── middleware/     Code that runs before controllers (e.g. JWT auth check)
└── config/         Environment config, DB connection setup
```

## Setup

```
npm install
cp .env.example .env   # fill in your own values, never commit .env
npm run dev
```

## API Contract

See `/docs/api-contract.md` at the repo root for the agreed request/response shapes for every endpoint. Update that file whenever an endpoint changes shape, so frontend isn't building against stale assumptions.
