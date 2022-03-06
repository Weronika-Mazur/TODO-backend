const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
