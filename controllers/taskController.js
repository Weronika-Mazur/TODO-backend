const { Task } = require("../models/task");
const User = require("../models/user");

const get_tasks = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user) {
      return res.status(200).send(user.todo);
    }
    res.status(403).send({ error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
};

const add_task = async (req, res) => {
  try {
    const task = new Task(req.body);
    const user = await User.findOne({ _id: req.user._id });

    if (user) {
      user.todo = [...user.todo, task];
      await user.save();
      return res.status(200).send(user.todo);
    }

    res.status(403).send({ error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
};

const clear_tasks = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user) {
      user.todo = user.todo.filter((task) => task.state === "active");
      await user.save();
      return res.status(200).send(user.todo);
    }
    res.status(403).send({ error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
};

const get_task = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: req.user._id });
    if (user) {
      const task = user.todo.id(id);
      return res.status(200).send(task);
    }
    res.status(403).send({ error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
};

const delete_task = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: req.user._id });
    if (user) {
      user.todo.id(id).remove();
      await user.save();
      return res.status(200).send(user.todo);
    }
    res.status(403).send({ error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
};

const change_task = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: req.user._id });
    if (user) {
      const task = user.todo.id(id);
      task.set(req.body);

      await user.save();
      return res.status(200).send(task);
    }
    res.status(403).send({ error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  get_tasks,
  add_task,
  clear_tasks,
  get_task,
  delete_task,
  change_task,
};
