const User = require("../models/users");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const registerUser = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    user.password = undefined;
    const token = generateToken(user._id);
    res.send({ user, token });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(404).send("Data not Found");
    }
    user.password = undefined;
    const token = generateToken(user._id);
    res.send({ token });
  } catch (err) {
    return next(err);
  }
};

const authController = {
  registerUser,
  login,
};

module.exports = authController;
