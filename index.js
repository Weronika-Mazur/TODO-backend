const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Task = require("./models/task");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

const dbURL =
  "mongodb+srv://wercianka:s1tOGsSF7umhf6yS@cluster0.f3be4.mongodb.net/todos?retryWrites=true&w=majority";

mongoose
  .connect(dbURL)
  .then((result) => {
    console.log("connected to DB");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/todos", (req, res) => {
  Task.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/todos", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then((result) => {
      res.redirect("/todos");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/todos", (req, res) => {
  Task.deleteMany({ state: "completed" })
    .then((result) => {
      res.json({ redirect: "/todos" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  Task.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;

  Task.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/todos" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;

  Task.findOneAndUpdate({ _id: id }, { ...req.body })
    .then((result) => {
      res.json({ redirect: "/todos" });
    })
    .catch((err) => {
      console.log(err);
    });
});
