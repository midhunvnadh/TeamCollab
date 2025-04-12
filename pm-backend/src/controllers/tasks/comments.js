const {
  addComment,
  fetchComments,
  updateComment,
  removeComment,
} = require("../../repository/taskComments");

const createComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId, comment } = req.body;
    const newComment = await addComment(taskId, userId, comment);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { taskId } = req.params;
    const comments = await fetchComments(taskId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;
    const updatedComment = await updateComment(commentId, comment);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await removeComment(commentId);
    res.status(200).json(deletedComment);
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
