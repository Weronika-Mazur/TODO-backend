import { Request, Response } from "express";
import { User } from "../models/user";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const correctCredentials = await User.compareCredentials(email, password);
    if (!correctCredentials) {
      return res.status(401).send({ error: "Invalid Credentials" });
    }

    await user.generateToken();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res
        .status(409)
        .send({ error: "User Already Exist. Please Login" });
    }

    const user = new User({ email: email, password });
    await user.save();

    await user.generateToken();

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

export const loginController = { login, register };
