backend/src/routes/leaveRoutes.js
const express = require("express");

const {
  createLeaveRequest,
  listLeaveRequests,
  editLeaveRequest,
  cancelLeaveRequest,
} = require("../controllers/leaveController");

const router = express.Router();

// Create a leave request
router.postbackend/src/routes/leaveRoutes.js("/leave-requests", createLeaveRequest);

// View leave requests
router.get("/leave-requests", listLeaveRequests);

// Edit a pending leave request
router.put("/leave-requests/:id", editLeaveRequest);

// Cancel a pending leave request
router.put("/leave-requests/:id/cancel", cancelLeaveRequest);

module.exports = router;
