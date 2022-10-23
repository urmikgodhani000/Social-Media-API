const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/", protect, postController.createPost);
router.delete("/:id", protect, postController.deletePost);

router.post("/:postId", protect, postController.noOfCommentAndLIke);

module.exports = router;
