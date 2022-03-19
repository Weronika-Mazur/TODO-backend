const User = require("../models/user");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await User.compareCredentials(email, password))) {
      await user.generateToken();

      return res.status(200).json(user);
    }
    res.status(400).send({ error: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
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

module.exports = {
  login,
  register,
};
