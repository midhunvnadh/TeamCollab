const {
  addComment,
  fetchComments,
  updateComment,
  removeComment,
} = require("../repository/taskComments");

const createComment = async (taskId, userId, comment) => {
  return await addComment(taskId, userId, comment);
};

const getComments = async (taskId) => {
  return await fetchComments(taskId);
};

const editComment = async (commentId, updatedComment) => {
  return await updateComment(commentId, updatedComment);
};

const deleteComment = async (commentId) => {
  return await removeComment(commentId);
};

module.exports = {
  createComment,
  getComments,
  editComment,
  deleteComment,
};
