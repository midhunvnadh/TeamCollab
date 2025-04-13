const {
  addComment,
  fetchComments,
  updateComment,
  removeComment,
} = require("../repository/taskComments");
const socketUtil = require("../lib/socket");
const { getUserById } = require("../repository/user");

const createComment = async (taskId, userId, comment) => {
  const newComment = await addComment(taskId, userId, comment);
  const get_user = await getUserById(userId);
  console.log(get_user);
  newComment.username = get_user.username;
  if (newComment) {
    socketUtil.emitTaskUpdate("comment_added", { taskId, comment: newComment });
  }
  return newComment;
};

const getComments = async (taskId) => {
  return await fetchComments(taskId);
};

const editComment = async (commentId, updatedComment, taskId) => {
  const result = await updateComment(commentId, updatedComment);
  if (result) {
    socketUtil.emitTaskUpdate("comment_updated", { taskId, comment: result });
  }
  return result;
};

const deleteComment = async (commentId, taskId) => {
  const result = await removeComment(commentId);
  if (result) {
    socketUtil.emitTaskUpdate("comment_deleted", { taskId, commentId });
  }
  return result;
};

module.exports = {
  createComment,
  getComments,
  editComment,
  deleteComment,
};
