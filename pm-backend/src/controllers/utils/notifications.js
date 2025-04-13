const { getLatestUserTasks } = require("../../services/taskService");
const socketUtil = require("../../lib/socket");

const notificationsController = async (req, res) => {
  const user = req.user;

  if (!user || !user.id) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const tasks = await getLatestUserTasks(user.id);
    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No notifications found" });
    }

    // Emit notification event
    socketUtil.emitNotification("tasks_updated", {
      userId: user.id,
      tasks,
    });

    return res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  notificationsController,
};
