const {
  addComment,
  fetchComments,
  updateComment,
  removeComment,
} = require("../../repository/taskComments");

const createComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req?.user?.id;
    const { comment } = req.body;
    const newComment = await addComment(taskId, userId, comment);
    if (!newComment) {
      return res
        .status(400)
        .json({ success: false, error: "Failed to add comment" });
    }
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { taskId } = req.params;
    const comments = await fetchComments(taskId);
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;
    const updatedComment = await updateComment(commentId, comment);
    if (!updatedComment) {
      return res
        .status(400)
        .json({ success: false, error: "Failed to update comment" });
    }
    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await removeComment(commentId);
    if (!deletedComment) {
      return res
        .status(400)
        .json({ success: false, error: "Failed to delete comment" });
    }
    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      comment: deletedComment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getComments,
  editComment,
  deleteComment,
};
