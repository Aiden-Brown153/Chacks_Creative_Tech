// Demo in-memory storage for leave requests
const leaveRequests = [];

// Demo employee balances
const employeeBalances = {
  employee1: {
    annual_leave_balance: 10,
    sick_leave_balance: 5,
    comp_time_balance: 3,
  },
};

// Work out how many days the employee requested
function calculateLeaveDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference = end - start;
  return difference / (1000 * 60 * 60 * 24) + 1;
}

// Match leave type to the correct balance field
function getBalanceField(leaveType) {
  if (leaveType === "annual") return "annual_leave_balance";
  if (leaveType === "sick") return "sick_leave_balance";
  if (leaveType === "comp_time") return "comp_time_balance";

  return null;
}

// Create a new leave request
function createLeaveRequest(req, res) {
  const currentUser = req.user.username;
  const currentRole = req.user.role;

  if (currentRole !== "employee") {
    return res.status(403).json({ message: "Only employees can create leave requests" });
  }

  const { start_date, end_date, reason, leave_type } = req.body;

  const balanceField = getBalanceField(leave_type);

  if (!balanceField) {
    return res.status(400).json({ message: "Invalid leave type" });
  }

  const requestedDays = calculateLeaveDays(start_date, end_date);

  if (requestedDays <= 0) {
    return res.status(400).json({ message: "End date must be after start date" });
  }

  const employeeBalance = employeeBalances[currentUser];

  if (!employeeBalance || employeeBalance[balanceField] < requestedDays) {
    return res.status(400).json({
      message: "Insufficient leave balance",
      requested_days: requestedDays,
    });
  }

  const leaveRequest = {
    id: leaveRequests.length + 1,
    employee: currentUser,
    start_date,
    end_date,
    reason,
    leave_type,
    days: requestedDays,
    status: "pending",
  };

  leaveRequests.push(leaveRequest);

  return res.status(201).json({
    message: "Leave request submitted successfully",
    leave_request: leaveRequest,
  });
}

// List leave requests
function listLeaveRequests(req, res) {
  const currentUser = req.user.username;
  const currentRole = req.user.role;

  if (currentRole === "manager") {
    return res.json(leaveRequests);
  }

  const userRequests = leaveRequests.filter(
    (leave) => leave.employee === currentUser
  );

  return res.json(userRequests);
}

// Edit a leave request
function editLeaveRequest(req, res) {
  const currentUser = req.user.username;
  const currentRole = req.user.role;
  const requestId = Number(req.params.id);

  if (currentRole !== "employee") {
    return res.status(403).json({ message: "Only employees can edit leave requests" });
  }

  const leaveRequest = leaveRequests.find((leave) => leave.id === requestId);

  if (!leaveRequest) {
    return res.status(404).json({ message: "Leave request not found" });
  }

  if (leaveRequest.employee !== currentUser) {
    return res.status(403).json({ message: "You can only edit your own leave requests" });
  }

  if (leaveRequest.status !== "pending") {
    return res.status(400).json({ message: "Only pending leave requests can be edited" });
  }

  leaveRequest.start_date = req.body.start_date || leaveRequest.start_date;
  leaveRequest.end_date = req.body.end_date || leaveRequest.end_date;
  leaveRequest.reason = req.body.reason || leaveRequest.reason;
  leaveRequest.leave_type = req.body.leave_type || leaveRequest.leave_type;

  return res.json({
    message: "Leave request updated successfully",
    leave_request: leaveRequest,
  });
}

// Cancel a leave request
function cancelLeaveRequest(req, res) {
  const currentUser = req.user.username;
  const currentRole = req.user.role;
  const requestId = Number(req.params.id);

  if (currentRole !== "employee") {
    return res.status(403).json({ message: "Only employees can cancel leave requests" });
  }

  const leaveRequest = leaveRequests.find((leave) => leave.id === requestId);

  if (!leaveRequest) {
    return res.status(404).json({ message: "Leave request not found" });
  }

  if (leaveRequest.employee !== currentUser) {
    return res.status(403).json({ message: "You can only cancel your own leave requests" });
  }

  if (leaveRequest.status !== "pending") {
    return res.status(400).json({ message: "Only pending leave requests can be cancelled" });
  }

  leaveRequest.status = "cancelled";

  return res.json({
    message: "Leave request cancelled successfully",
    leave_request: leaveRequest,
  });
}

module.exports = {
  createLeaveRequest,
  listLeaveRequests,
  editLeaveRequest,
  cancelLeaveRequest,
};
