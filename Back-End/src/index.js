// ============================================================================
// LEAVEFLOW — SERVER ENTRY POINT / ROUTE INTEGRATION
// Author: Aiden Brown | Team Lead — hosting/integration
// ============================================================================
// This is the one file every backend route ultimately gets wired into. As
// each person's route file becomes real, add ONE line here to mount it and
// commit that line as its own small change (see Team Briefing, Section 4 —
// "As each backend person's route file becomes real, add the one line in
// index.js that mounts it... and commit that separately").
//
// Only auth is mounted for now, since auth is the only module that currently
// has a real route file committed under its rightful owner. Each other
// person's route gets uncommented and wired in as THEY commit their own
// file — not pre-built here on their behalf.
// ============================================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

// As each of these lands under its real owner's own commit, uncomment the
// matching require + app.use line below and commit that change separately:
//
// const employeeRoutes = require('./routes/employeeRoutes');     // Phila
// const leaveRoutes = require('./routes/leaveRoutes');           // Khabir
// const approvalRoutes = require('./routes/approvalRoutes');     // Simphiwe
// const notificationRoutes = require('./routes/notificationRoutes'); // Nandipha
// const reportRoutes = require('./routes/reportRoutes');         // Asande

const app = express();

// Lets the frontend (running on a different port during development) make
// requests to this server without the browser blocking them for security
// reasons. In production this should be locked down to the actual deployed
// frontend URL rather than left wide open.
app.use(cors());

// Parses incoming JSON request bodies (e.g. login/signup payloads) into
// req.body, so every controller can read req.body.email etc. directly.
app.use(express.json());

app.use('/api/auth', authRoutes);

// app.use('/api/employees', employeeRoutes);
// app.use('/api/leave-requests', leaveRoutes);
// app.use('/api/approvals', approvalRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/reports', reportRoutes);

// A simple, no-auth-required endpoint for confirming the server is up — 
// useful for quick manual checks and for hosting platforms that expect a
// health check URL.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`LeaveFlow backend listening on port ${PORT}`);
});

module.exports = app;
