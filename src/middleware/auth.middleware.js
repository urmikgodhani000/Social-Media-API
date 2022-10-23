const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/users");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.send("User not loggedin!");
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      res.send("The user belonging to this token does no longer exist.");
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return next(err);
  }
};
