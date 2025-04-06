const { createProjectService } = require("../../services/projectService");

const createProjectController = async (req, res) => {
  const { name } = req.body;
  const { id: userId } = req.user;
  const c = createProjectService(name, userId);
  res.json(c);
};

module.exports = {
  createProjectController,
};
