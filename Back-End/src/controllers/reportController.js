const pool = require('../config/db');

// GET /api/reports/leave-summary
// Must give HR a general overview of leave data.
async function getLeaveSummary(req, res) {
  try {
    const byStatus = await pool.query(
      `SELECT status, COUNT(*) AS count
       FROM leave_requests
       GROUP BY status`
    );

    const byType = await pool.query(
      `SELECT leave_type, COUNT(*) AS count
       FROM leave_requests
       GROUP BY leave_type`
    );

    const totalEmployees = await pool.query(
      `SELECT COUNT(*) AS count
       FROM employees
       WHERE role = 'employee'`
    );

    res.json({
      byStatus: byStatus.rows,
      byType: byType.rows,
      totalEmployees: Number(totalEmployees.rows[0].count),
    });
  } catch (err) {
    console.error("Leave summary error:", err);
    res.status(500).json({
      message: "Could not build report"
    });
  }
}

// GET /api/reports/department
// Shows leave requests by department.
async function getDepartmentReport(req, res) {
  try {
    const result = await pool.query(
      `SELECT
          employees.department,
          COUNT(leave_requests.id) AS leave_count
       FROM employees
       JOIN leave_requests
       ON employees.id = leave_requests.employee_id
       GROUP BY employees.department
       ORDER BY leave_count DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Department report error:", err);
    res.status(500).json({
      message: "Could not build department report"
    });
  }
}

// GET /api/reports/approval-trends
// Shows approvals and rejections over time.
async function getApprovalTrend(req, res) {
  try {
    const result = await pool.query(
      `SELECT
          DATE_TRUNC('month', decided_at) AS month,
          COUNT(*) FILTER (WHERE status = 'approved') AS approved,
          COUNT(*) FILTER (WHERE status = 'rejected') AS rejected
       FROM leave_requests
       WHERE decided_at IS NOT NULL
       GROUP BY month
       ORDER BY month`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Approval trend error:", err);
    res.status(500).json({
      message: "Could not build approval trend report"
    });
  }
}

// GET /api/reports/employee/:id
// Returns one employee's leave history.
async function getEmployeeLeaveHistory(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT
          employees.full_name,
          employees.department,
          leave_requests.leave_type,
          leave_requests.start_date,
          leave_requests.end_date,
          leave_requests.status,
          leave_requests.reason,
          leave_requests.submitted_at,
          leave_requests.decided_at
       FROM employees
       JOIN leave_requests
       ON employees.id = leave_requests.employee_id
       WHERE employees.id = $1
       ORDER BY leave_requests.submitted_at DESC`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No leave history found"
      });
    }

    res.json(result.rows);
  } catch (err) {
    console.error("Employee history error:", err);
    res.status(500).json({
      message: "Could not load employee history"
    });
  }
}

// Dashboard statistics
async function getDashboardStats(req, res) {
  try {
    const pending = await pool.query(
      `SELECT COUNT(*) AS count
       FROM leave_requests
       WHERE status = 'pending'`
    );

    const approved = await pool.query(
      `SELECT COUNT(*) AS count
       FROM leave_requests
       WHERE status = 'approved'`
    );

    const rejected = await pool.query(
      `SELECT COUNT(*) AS count
       FROM leave_requests
       WHERE status = 'rejected'`
    );

    res.json({
      pending: Number(pending.rows[0].count),
      approved: Number(approved.rows[0].count),
      rejected: Number(rejected.rows[0].count)
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({
      message: "Could not load dashboard statistics"
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
