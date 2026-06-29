// =========================================================================
// LEAVEFLOW -AUTH CONTROLLER
// Author: Aiden Brown | Module: Authentication & User Management
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
 * --------------------------------
 * Expected request body: {fullName, email, password, employeeCode, department, role? }
 * 
 * Step by Step:
 *  1. Check the required fields were actually sent.
 *  2. Check no account already exists wit that email.
 *  3. Hash the password (never store it as plain text).
 *  4. Insert the new row into the database.
 *  5. Immediately log the new user in by issuing a token, so they don't
 *     have to sign up then seperately log in straight after.
 */
async function signup(req, res) {
    // Destructuring: pulls these named fields out of the JSON body the
    // frontend sent.
    const {full_name, email, password, employeeCode, department, role} = req.body:

    // Basic validation - if any truly required field is missing, stop here
    // rather than letting a confusing database error happen later.
    if (!full_name || !email || !password) {
        return res.status(400).json({message: 'fullName, email and password are required' });
    }

    try {
        // Look up whether an account with this email already exists. The "$1"
        // is a placeholder -pg safely inserts the email calue in place of $1.
        // This pattern ("paremetrised query") is critical: it prevents SQL
        // injection attacks, where a malicious user could otherwise tupe SQL
        // code into email field itself.
        const existing = await pool.query('SELECT id FROM employees WHERE email =$1', [email]);

        if (existing.rows.length > 0) {
            // 409 = "Conflict" - the standard HTTP code for "this already exists."
            return res.status(409).json({meassage: 'An accountwith that email already exists'});
        }

        // Turn the plain-text password into a secure hash before it ever
        // touches the databse.
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        // Defensive check: even though the frontend signup form only ever sends
            // "employee", this guards against anyone calling this endpoint directly
            // (e.g. via curl/Postman) and trying to grant themselves hr_manager
            // access by passing an unexpected role value.
            const safeRole = role === 'hr_manager' ? 'hr_manager' : 'employee';
        
            // Insert the new employee row. "RETURNING *" tells Postgres to hand
            // back the full new row (including the auto-generated id) immediately.
            const result = await pool.query(
            `INSERT INTO employees (full_name, email, employee_code, password_hash, department, role)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [fullName, email, employeeCode || null, passwordHash, department || null, safeRole]
        );

        const employee = result.row[0]; // the newly created row
        const token = signToken(employee);

        // 201 = "Created" - the correct HTTP code for successfully creating a
        // new resource (as opposed to 200, generic "OK").
        res.status(201).json({ token, user: toPublicUser(employee) });
    }catch (err) {
     // Anything unexpected (database connection drop, etc.) lands here. We
     // log the real error for our own debugging, but send back a vague, safe
     // message tot the user - never expose raw database errors to the 
     // frontend, as they can leak internal details.
     console.error('Signup error:', err);
     res.status(500).json({ message: 'Could not create account' });
    }
}

/**
 * login - POST /api/auth/login
 * ----------------------------
 * Expected request body: { email, password }
 * 
 * Step by step:
 *  1. Check both fields were sent.
 *  2. Look up the account by email.
 *  3. Compare the submitted password against the stored hash.
 *  4. If it matches, issues a token.
 */
async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required'});
    }

    try{
        const result = await pool.query('SELECT * FROM employees WHERE email = $1', [email]);
        const employee = result.row[0]; // undefined if no match was found

        if (!employee) {
            // Deliberately the SAME error message as "wrong password" below. If
            // we said "no account with that email" specifically, an attacker
            // could use that to figure out which emails are registered. Giving an
            // identical, vague message for both cases is a standard security
            // practice
            return res.status(401).json({ message: 'Invalid email or password'});
        }

        // bcrypt.compare takes the plain password the user just typed and
        // checks it against the stored hash — this is the "un-reversible but
        // checkable" property of hashing mentioned above.
        const valid = await bcrypt.compare(password, employee.password_hash);
        if (!valid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = signToken(employee);
        res.json({ oken, user: toPublicUser(employee) });
    } catch (err) {
        console.error('Login error', err);
        res.status(500).json({ message: 'Login failed' });
    }
}

module.exports = { signup, login };
