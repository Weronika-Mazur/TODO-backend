const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.get("/", taskController.get_tasks);
router.post("/add-task", taskController.add_task);
router.delete("/clear-tasks", taskController.clear_tasks);
router.get("/get-task/:id", taskController.get_task);
router.delete("/delete-task/:id", taskController.delete_task);
router.put("/change-task/:id", taskController.change_task);

module.exports = router;
