const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const postController = require("../controllers/post.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/follow/:id", protect, userController.follower);
router.post("/unfollow/:id", protect, userController.unfollower);
router.post("/like/:id", protect, postController.likePost);
router.post("/unlike/:id", protect, postController.unlikePost);
router.get("/all_posts", protect, postController.allPost);

module.exports = router;
