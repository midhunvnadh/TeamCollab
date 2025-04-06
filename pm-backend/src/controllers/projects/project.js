const {
  createProjectService,
  getProjectsService,
} = require("../../services/projectService");

const createProjectController = async (req, res) => {
  const { name } = req.body;
  const { id: userId } = req.user;
  const c = await createProjectService(name, userId);
  if (c.success) {
    return res.status(201).json({
      message: "Project created successfully",
      projectId: c.projectId,
    });
  }
  return res.status(500).json({
    message: "Error creating project",
  });
};

const getProjectsController = async (req, res) => {
  const { id: userId } = req.user;
  const c = await getProjectsService(userId);
  if (c.success) {
    return res.status(200).json({
      message: "Projects fetched successfully",
      projects: c.projects,
    });
  }
  return res.status(500).json({
    message: "Error fetching projects",
  });
};

module.exports = {
  createProjectController,
};
