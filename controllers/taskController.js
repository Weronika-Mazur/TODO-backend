const Task = require("../models/task");

const get_tasks = (req, res) => {
  Task.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const add_task = (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then((result) => {
      res.redirect("/todos");
    })
    .catch((err) => {
      console.log(err);
    });
};

const clear_tasks = (req, res) => {
  Task.deleteMany({ state: "completed" })
    .then((result) => {
      res.json({ redirect: "/todos" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_task = (req, res) => {
  const id = req.params.id;
  Task.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const delete_task = (req, res) => {
  const id = req.params.id;

  Task.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/todos" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const change_task = (req, res) => {
  const id = req.params.id;

  Task.findOneAndUpdate({ _id: id }, { ...req.body })
    .then((result) => {
      res.json({ redirect: "/todos" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  get_tasks,
  add_task,
  clear_tasks,
  get_task,
  delete_task,
  change_task,
};
