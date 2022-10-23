const User = require("../models/users");

const follower = async (req, res, next) => {
  try {
    if (req.params.id == req.user._id) {
      res.status(404).send("User are same!!");
      return;
    }

    const followerApi = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $addToSet: { followers: req.params.id } }
    );

    const followingApi = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { following: req.user._id } }
    );

    res.send({
      message: `${followerApi.username} Follow ${followingApi.username}`,
    });
  } catch (err) {
    return next(err);
  }
};

const unfollower = async (req, res, next) => {
  try {
    const unfolloweAPi = await User.findByIdAndUpdate(req.user._id, {
      $pull: { followers: req.params.id },
    });
    const unfolloweingAPi = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { following: req.user._id } }
    );

    res.send({
      message: `${unfolloweAPi.username} unfollow ${unfolloweingAPi.username}`,
    });
  } catch (err) {
    return next(err);
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    const followerLeg = user.followers.length;
    const followingLeg = user.following.length;

    res.send({
      username: user.username,
      follower: followerLeg,
      following: followingLeg,
    });
  } catch (err) {
    return next(err);
  }
};

const userController = {
  follower,
  unfollower,
  profile,
};

module.exports = userController;
