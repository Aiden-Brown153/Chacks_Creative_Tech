const express = require('express');
const router = express.Router();

const {requireAuth, requireRole} = require('../middleware/auth');

const {
  getLeaveSummary,
  getDepartmentReport,
  getApprovalTrend,
  getEmployeeLeaveHistory,
  getDashboardStats
} = require('../controllers/reportController');


// HR report routes

router.get('/leave-summary',
  requireAuth,
  requireRole('hr_manager'),
  getLeaveSummary
);

router.get('/department',
  requireAuth,
  requireRole('hr_manager'),
  getDepartmentReport
);

router.get('/approval-trends',
  requireAuth,
  requireRole('hr_manager'),
  getApprovalTrend
);

router.get('/employee/:id',
  requireAuth,
  requireRole('hr_manager'),
  getEmployeeLeaveHistory
);

router.get('/dashboard',
  requireAuth,
  requireRole('hr_manager'),
  getDashboardStats
);


module.exports = router;
