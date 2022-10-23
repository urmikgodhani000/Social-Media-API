const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, userController.profile);
router.post("/follower/:id", protect, userController.follower);
router.post("/unfollower/:id", protect, userController.unfollower);

module.exports = router;
