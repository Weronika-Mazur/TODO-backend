const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const { taskSchema } = require("../models/task");

const saltRounds = 10;

const userSchema = new Schema({
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
userSchema.statics.compareCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  const result = await bcrypt.compare(password, user.password);
  return result;
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.TOKEN_KEY
  );
  user.token = token;
  await user.save();

  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
