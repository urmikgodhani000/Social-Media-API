const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Create routes for user here
router.post("/signup", authController.registerUser);
router.post("/", authController.login);
module.exports = router;
