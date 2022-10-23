const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/", protect, postController.createPost);
router.post("/:postId", protect, postController.noOfCommentAndLIke);
router.delete("/:id", protect, postController.deletePost);
router.post("/like/:id", protect, postController.likePost);
router.post("/unlike/:id", protect, postController.unlikePost);
router.get("/all_posts", protect, postController.allPost);

module.exports = router;
