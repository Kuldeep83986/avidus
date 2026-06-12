const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  deleteAnyTask,
  getStats,
} = require("../controllers/adminController");
const { getActivityLogs } = require("../controllers/activityController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/stats", protect, adminOnly, getStats);
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.put("/users/:id", protect, adminOnly, updateUserStatus);
router.get("/tasks", protect, adminOnly, getAllTasks);
router.delete("/tasks/:id", protect, adminOnly, deleteAnyTask);
router.get("/activities", protect, adminOnly, getActivityLogs);

module.exports = router;
