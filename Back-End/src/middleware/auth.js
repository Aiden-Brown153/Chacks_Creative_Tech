// =========================================================================
// LEAVEFLOW - AUTH MIDDLEWARE
// Author: Aiden Brown | Module: Authentication & User Management
// =========================================================================
// "Middleware" is a function that runs BEFORE the actual logic of a route,
// acting like a security checpoint. Every protected route in this app
// (leave requests, profiles, reports) passes through this file first.
// =========================================================================

const jwt = require('jsonwebtoken');
// jsonwebtoken is a third-party library that creates and checks JWTs (JSON
// Web Tokens) - a standard, tamper-proof way of saying "this user proved who
// they are, here's a signed token as evidence."

/**
 * requireAuth
 * -----------
 * Runs on every request to a protected route. It's only job is to answer one
 * question: "did this request include a valid, unexpired token?"
 * 
 * If yes -> attach the decoded user info to req.user so later code
 *           (controllers) can know who's making the request, then call
 *           next() to let the request continue to its real destination.
 * If no ->  immediately stop the request and send back a 401 error(the
 *           standard HTTP code for "you're not logged in").
 */

function requireAuth(req, res, next) {
    // Tokens are sent in the request's "Authorization" header, in the format:
    // "Bearer <the actual token text>". We need that header here.
    const header = req.headers.authorization;

    // If there's no header at all, or it doesn't start with the word
    // "Bearer ", we know immediately there's no cvalid token to check - reject
    // the request before doing any further work.
    if(!header || !header.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Missing or invalid Authorization header'});
    }

    // header looks like "Bearer eyJhbGciOiJIUzI1NiIs...". Splitting on the
    // space and talking the second piece gegts us just the token itself.
    const token = header.split(' ')[1];

    try {
      // jwt.verify does two things at once:
      //   1. Checks the token's signature against our secret key, to prove it
      //      was genuinely issued by OUR server and hasn't been forged.
      //   2. Checks the token hasn't expired (tokens expire after 8 hours —
      //      see signToken in authController.js).
      // If either check fails, this line throws an error, which is why it's
      // wrapped in a try/catch.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
}