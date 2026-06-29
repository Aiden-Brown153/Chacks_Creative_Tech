// =========================================================================
// LEAVEFLOW -AUTH CONTROLLER
// =========================================================================
// A "controller" holds the actual business logic for a route - what should
// happen step by step, when a particular request comes in. This file
// handles account creation (signup) and logging in (login)
// =========================================================================

const bcrypt = require('bcrypt');
// bcrypt is a library specifically built for safely hashing passwords. It's 
// deliberatley slow (by design) to make brute- force quessing attacks
// impractically slow for an attacker, even if they steal the database.

const jwt = require('jsonwebtoken');
const pool = require('.../config/db');

const SALT_ROUNDS =10;
//"Salt Rounds" controls how many times bcrypt scrambles the password
// internally before storing it. 10 is a widely used, sensible defualt -high
// enough to be secure, low enough to not noticeably slow down signup.

/**
 * signToken
 * ---------
 * A small internal helper (not exported, only used inside this file) that
 * creates a JWT for a given employee row. Keeping this in one place means
 * both signup and login create tokens in exactly the same, consistent way.
 */

function signToken(employee) {
    return jwt.sign(
        // The "payload" - information baked into the token itself. Deliberately
        // minimal (id,role, email), and NEVER the password/password_hash, since
        // a JWT's payload is technically readable by anyone holding the token
        // (it's signed, not encrypted).
        {id: employee.id, role: employee.role, email: employee.email },
        process.env.JWT_SECRET,   // our private signing key, kept in .env
        {expiresIn: '8h' }        // token stops being valid after 8 hours
    );
}

/**
 * toPublicUser
 * ------------
 * Strips out everything from a raw database row that we never want to send
 * back to the browser (especially password_hash). This function is the ONLY
 * place that decides what a "user object" looks like to the frontend, which
 * makes it much harder to accidentally leak something sensitive later.
 */

function toPublicUser(employee) {
    return {
        id : employee.id,
        name: employee.full_name,
        email: employee.email,
        role: employee.role,
        department: employee.department,
    };
}

/**
 * signup - POST /api/auth/signup
 */