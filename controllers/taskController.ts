import { Request, Response } from "express";

import { Task } from "../models/task";
import { User } from "../models/user";

import { TaskDocument } from "../type/task";

const getTasks = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(403).send({ error: "Invalid Credentials" });
    }
    res.status(200).send(user.todo);
  } catch (err) {
    console.log(err);
  }
};

const addTask = async (req: Request, res: Response) => {
  try {
    const task = new Task<TaskDocument>(req.body);
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(403).send({ error: "Invalid Credentials" });
    }

    user.todo.push(task);
    await user.save();
    res.status(200).send(user.todo);
  } catch (err) {
    console.log(err);
  }
};

const clearTasks = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(403).send({ error: "Invalid Credentials" });
    }
    await User.updateOne(
      { _id: req.user._id },
      { $pull: { todo: { state: "completed" } } }
    );

    res.status(200).send(user.todo);
  } catch (err) {
    console.log(err);
  }
};

const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(403).send({ error: "Invalid Credentials" });
    }

    const task = user.todo.id(id);
    res.status(200).send(task);
  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(403).send({ error: "Invalid Credentials" });
    }

    const task = user.todo.id(id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    task.remove();
    await user.save();
    res.status(200).send(user.todo);
  } catch (err) {
    console.log(err);
  }
};

const changeTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(403).send({ error: "Invalid Credentials" });
    }

    const task = user.todo.id(id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    task.set(req.body);
    await user.save();
    res.status(200).send(task);
  } catch (err) {
    console.log(err);
  }
};

export const taskController = {
  getTasks,
  addTask,
  clearTasks,
  getTask,
  deleteTask,
  changeTask,
};
