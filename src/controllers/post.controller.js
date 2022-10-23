const { model } = require("mongoose");
const Post = require("../models/posts");
const Like = require("../models/like");
const Comment = require("../models/comment");

const createPost = async (req, res, next) => {
  try {
    const postCreate = await Post.create({
      tital: req.body.tital,
      discription: req.body.discription,
    });
    res.send({ postCreate });
  } catch (err) {
    return next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const deletePost = await Post.findByIdAndDelete(
      { _id: req.params.id },
      { new: true }
    );
    if (!deletePost) {
      res.status(404).send("Post Not Found");
      return;
    }
    res.send({ deletePost, message: "Delete Post" });
  } catch (err) {
    return next(err);
  }
};

const likePost = async (req, res, next) => {
  try {
    const isAlreadyLiked = await Like.findOne({
      postId: req.params.id,
      like: req.user._id,
    });

    if (isAlreadyLiked) throw new Error("Post already liked!");

    const likePostFromUser = await Like.create({
      postId: req.params.id,
      like: req.user._id,
    });

    res.send({ likePostFromUser });
  } catch (err) {
    return next(err);
  }
};

const unlikePost = async (req, res, next) => {
  try {
    const { deletedCount: unlikeFormUser } = await Like.deleteOne({
      postId: req.params.id,
      userId: req.user._id,
    });

    if (!unlikeFormUser) {
      res.status(404).send("Post Not Found");
      return;
    }

    res.send({ unlikeFormUser, message: "Unlike Post" });
  } catch (err) {
    return next(err);
  }
};

const noOfCommentAndLIke = async (req, res, next) => {
  try {
    const findPostLike = await Like.find({
      postId: req.params.postId,
    }).count();

    const findPostComment = await Comment.find({
      postId: req.params.postId,
    }).count();

    res.send({ Like: findPostLike, Comment: findPostComment });
  } catch (err) {
    return next(err);
  }
};

const allPost = async (req, res, next) => {
  try {
    const findAllPost = await Post.find({ userId: req.user._id })
      .select("tital discription")
      .sort({
        createdAt: -1,
      });

    const response = await Promise.all(
      findAllPost.map(async (post) => {
        const [likes, comments] = await Promise.all([
          Like.count({ postId: post._id }),
          Comment.find({ postId: post._id })
            .select("postId userId content")
            .populate({
              path: "userId",
              select: "username email",
            }),
        ]);

        return {
          ...post.toObject(),
          likes: likes,
          comments: comments,
        };
      })
    );

    res.send(response);
  } catch (err) {
    return next(err);
  }
};
const postController = {
  createPost,
  deletePost,
  likePost,
  unlikePost,
  noOfCommentAndLIke,
  allPost,
};

module.exports = postController;
