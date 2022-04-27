import express from "express";
import { taskController } from "../controllers/taskController";

import { auth } from "../middleware/auth";

const todosRoutes = express.Router();

todosRoutes.get("/", auth, taskController.getTasks);
todosRoutes.post("/add-task", auth, taskController.addTask);
todosRoutes.delete("/clear-tasks", auth, taskController.clearTasks);
todosRoutes.get("/get-task/:id", auth, taskController.getTask);
todosRoutes.delete("/delete-task/:id", auth, taskController.deleteTask);
todosRoutes.put("/change-task/:id", auth, taskController.changeTask);

export { todosRoutes };
