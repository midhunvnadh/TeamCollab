const {
  addComment,
  fetchComments,
  updateComment,
  removeComment,
} = require("../../repository/taskComments");

const createComment = async (req, res) => {
  const { taskId } = req.params;
  const userId = req?.user?.id;
  const { comment } = req.body;

  if (!taskId || !userId || !comment) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Task ID, user ID, and comment are required",
      });
  }

  try {
    const newComment = await addComment(taskId, userId, comment);
    if (!newComment) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to add comment" });
    }
    return res
      .status(201)
      .json({
        success: true,
        message: "Comment added successfully",
        comment: newComment,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getComments = async (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    return res
      .status(400)
      .json({ success: false, message: "Task ID is required" });
  }

  try {
    const comments = await fetchComments(taskId);
    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No comments found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Comments fetched successfully",
        comments,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;

  if (!commentId || !comment) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Comment ID and updated comment are required",
      });
  }

  try {
    const updatedComment = await updateComment(commentId, comment);
    if (!updatedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Comment updated successfully",
        comment: updatedComment,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  if (!commentId) {
    return res
      .status(400)
      .json({ success: false, message: "Comment ID is required" });
  }

  try {
    const deletedComment = await removeComment(commentId);
    if (!deletedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Comment deleted successfully",
        comment: deletedComment,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createComment,
  getComments,
  editComment,
  deleteComment,
};
