const Post = require("../models/Post");

const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide your comment",
      });
    }

    // 1️⃣ Find blog post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // 2️⃣ Push new comment (snapshot username!)
    post.comments.push({
      text,
      userId: req.user._id,
      username: req.user.username,
    });

    // 3️⃣ Save post
    await post.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: post.comments[post.comments.length - 1],
    });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required.",
      });
    }

    const post = await Post.findById(postId, { comments: 1 }).populate(
      "comments.userId",
      "username",
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: post.comments,
    });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide updated comment text.',
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // 1️⃣ Find the comment inside the post
    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    // 2️⃣ Owner-only check (no admin override)
    const isOwner = comment.userId.toString() === req.user._id.toString();

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to update this comment',
      });
    }

    // 3️⃣ Update comment text
    comment.text = text.trim();

    // 4️⃣ Save post
    await post.save();

    return res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // 1️⃣ Find the comment inside the post
    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    // 2️⃣ Check ownership OR admin role
    const isOwner = comment.userId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to delete this comment',
      });
    }

    // 3️⃣ Remove comment
    comment.deleteOne();

    // 4️⃣ Save post
    await post.save();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addComment, getComments, deleteComment, updateComment };
