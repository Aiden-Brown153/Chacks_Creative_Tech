// ============================================================================
// LEAVEFLOW — AUTH ROUTES
// Author: Aiden Brown | Module: Authentication & User Management
// ============================================================================
// "Routes" map a URL + HTTP method (e.g. "POST /api/auth/login") to the
// actual controller function that should handle it, and decide which
// middleware checkpoints a given URL has to pass through first.
//
// Mounted in the main server file as: app.use('/api/auth', authRoutes)
// So the full paths these create are: /api/auth/signup, /api/auth/login
// ============================================================================

const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Neither of these routes uses requireAuth — that would be a contradiction,
// since the whole point of these two routes is to let someone become
// authenticated in the first place. Every OTHER route in the app (leave
// requests, profiles, reports) does require it.
router.post('/signup', signup);
router.post('/login', login);

