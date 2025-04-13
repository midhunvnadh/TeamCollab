const db = require("../lib/db");

const addComment = async (taskId, userId, comment) => {
  const query = `
    INSERT INTO public.task_comments (task_id, user_id, comment, created_at)
    VALUES ($1, $2, $3, now())
    RETURNING *;
  `;
  const values = [taskId, userId, comment];
  const result = await db.query(query, values);
  return result[0];
};

const fetchComments = async (taskId) => {
  const query = `
    SELECT tc.id, tc.comment, tc.created_at, u.username AS username, u.id AS user_id
    FROM public.task_comments tc
    JOIN public.users u ON tc.user_id = u.id
    WHERE tc.task_id = $1
    ORDER BY tc.created_at ASC;
  `;
  const values = [taskId];
  const result = await db.query(query, values);
  return result;
};

const updateComment = async (commentId, updatedComment) => {
  const query = `
    UPDATE public.task_comments
    SET comment = $1
    WHERE id = $2
    RETURNING *;
  `;
  const values = [updatedComment, commentId];
  const result = await db.query(query, values);
  return result.length > 0;
};

const removeComment = async (commentId) => {
  const query = `
    DELETE FROM public.task_comments
    WHERE id = $1
    RETURNING *;
  `;
  const values = [commentId];
  const result = await db.query(query, values);
  return result.length > 0;
};

module.exports = {
  addComment,
  fetchComments,
  updateComment,
  removeComment,
};
