import { Schema, model } from "mongoose";
import { TaskDocument } from "../type/task";

const taskSchema = new Schema<TaskDocument>({
  content: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const Task = model<TaskDocument>("task", taskSchema);

export { Task, taskSchema };
