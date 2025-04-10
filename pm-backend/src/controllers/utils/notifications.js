const { getLatestUserTasks } = require("../../services/taskService");

const notificationsController = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const tasks = await getLatestUserTasks(userId);
  console.log(tasks, userId);
  res.status(200).json(tasks);
};

module.exports = {
  notificationsController,
};
