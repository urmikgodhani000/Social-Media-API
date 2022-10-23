const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/:postId", protect, commentController.createComment);

module.exports = router;
