import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { taskSchema } from "../models/task";

import { UserDocument, UserModel } from "../type/user";

const saltRounds = 10;

const userSchema = new Schema<UserDocument, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },

  todo: [taskSchema],
});

// hash password before saving
userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
  }
});

// find user by email and password
userSchema.statics.compareCredentials = async function (
  email: string,
  password: string
): Promise<boolean> {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const result = await bcrypt.compare(password, user.password);
  return result;
};

userSchema.methods.generateToken = async function (): Promise<string> {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.TOKEN_KEY
  );
  user.token = token;
  await user.save();

  return token;
};

const User = model<UserDocument, UserModel>("user", userSchema);

export { User };
