 const pool = require('../config/db');

// Get summary of leave requests
async function getLeaveSummary(req, res) {
  try {
    const status = await pool.query(
      `SELECT status, COUNT(*) AS count
       FROM leave_requests
       GROUP BY status`
    );

    const types = await pool.query(
      `SELECT leave_type, COUNT(*) AS count
       FROM leave_requests
       GROUP BY leave_type`
    );

    const employees = await pool.query(
      `SELECT COUNT(*) AS count
       FROM employees
       WHERE role = 'employee'`
    );

    res.json({
      status: status.rows,
      types: types.rows,
      employees: Number(employees.rows[0].count)
    });

  } catch(error) {
    res.status(500).json({
      message: "Could not get report"
    });
  }
}


// Get leave count by department
async function getDepartmentReport(req, res) {
  try {
    const result = await pool.query(
      `SELECT employees.department,
       COUNT(leave_requests.id) AS total_leave
       FROM employees
       JOIN leave_requests
       ON employees.id = leave_requests.employee_id
       GROUP BY employees.department`
    );

    res.json(result.rows);

  } catch(error) {
    res.status(500).json({
      message: "Could not get department report"
    });
  }
}


// Get approval report
async function getApprovalTrend(req, res) {
  try {
    const result = await pool.query(
      `SELECT status, COUNT(*) AS total
       FROM leave_requests
       WHERE status != 'pending'
       GROUP BY status`
    );

    res.json(result.rows);

  } catch(error) {
    res.status(500).json({
      message: "Could not get approval report"
    });
  }
}


// Get employee leave history
async function getEmployeeLeaveHistory(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT *
       FROM leave_requests
       WHERE employee_id = $1`,
      [id]
    );

    res.json(result.rows);

  } catch(error) {
    res.status(500).json({
      message: "Could not get employee history"
    });
  }
}


// Get dashboard statistics
async function getDashboardStats(req, res) {
  try {
    const result = await pool.query(
      `SELECT status, COUNT(*) AS total
       FROM leave_requests
       GROUP BY status`
    );

    res.json(result.rows);

  } catch(error) {
    res.status(500).json({
      message: "Could not load dashboard"
    });
  }
}


module.exports = {
  getLeaveSummary,
  getDepartmentReport,
  getApprovalTrend,
  getEmployeeLeaveHistory,
  getDashboardStats
};
