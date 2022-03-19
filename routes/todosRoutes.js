const express = require("express");
const taskController = require("../controllers/taskController");

const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, taskController.get_tasks);
router.post("/add-task", auth, taskController.add_task);
router.delete("/clear-tasks", auth, taskController.clear_tasks);
router.get("/get-task/:id", auth, taskController.get_task);
router.delete("/delete-task/:id", auth, taskController.delete_task);
router.put("/change-task/:id", auth, taskController.change_task);

module.exports = router;
