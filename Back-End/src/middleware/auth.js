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
    
    // Make the decoded info (id, role, email) available to every controller
    // function that runs after this one, for the lifetime of this request.
    req.user = decoded;

    // Tell Express "this checkpoint passed, continue to the next function in
    // line" (the actual route handler).
    next();
  } catch (err) {
    // Covers both "token is garbage/forged" and "token has expired."
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

/**
 * requireRole
 * -----------
 * A second, optional checkpoint that runs AFTER requireAuth. While
 * requireAuth only checks "are you logged in at all," this checks "are you
 * logged in AS THE RIGHT KIND OF USER for this specific action."
 *
 * Written as a function that RETURNS a function (a "higher-order function")
 * so it can be reused flexibly, e.g.:
 *   requireRole('hr_manager')              — only HR managers allowed
 *   requireRole('hr_manager', 'employee')   — either role allowed
 *
 * Usage example (seen in employeeRoutes.js / leaveRoutes.js):
 *   router.patch('/:id', requireAuth, requireRole('hr_manager'), someHandler);
 */
function requireRole(...allowedRoles) {
  // "...allowedRoles" (rest parameters) collects every argument passed into
  // requireRole(...) into a single array, however many there are.

  return (req, res, next) => {
    // req.user only exists because requireAuth ran first and set it — this
    // is why requireRole must always be used AFTER requireAuth in a route,
    // never on its own.
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      // 403 = "we know who you are, but you're not allowed to do this" —
      // distinct from 401 ("we don't know who you are at all").
      return res.status(403).json({ message: 'You do not have permission to do that' });
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
// module.exports makes these two functions importable from other files, e.g.
// const { requireAuth, requireRole } = require('../middleware/auth');