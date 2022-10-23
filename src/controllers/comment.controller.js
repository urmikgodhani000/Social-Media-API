const Comment = require("../models/comment");

const createComment = async (req, res) => {
  const commnetCreate = await Comment.create({
    postId: req.params.postId,
    userId: req.user._id,
    content: req.body.content,
  });
  res.send({ "Comment-ID": commnetCreate._id });
};

const commentController = {
  createComment,
};

module.exports = commentController;
