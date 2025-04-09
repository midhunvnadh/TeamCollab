const { deleteProject } = require("../../repository/projects");
const {
  createProjectService,
  getProjectsService,
  deleteProjectService,
  editProjectService,
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

const getProjectController = async (req, res) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;
  const c = await getProjectsService(userId, projectId);
  if (c.success) {
    return res.status(200).json({
      message: "Project fetched successfully",
      project: c.projects[0],
    });
  }
  return res.status(500).json({
    message: "Error fetching project",
  });
};

const deleteProjectController = async (req, res) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;
  const c = await deleteProjectService(userId, projectId);
  if (c.success) {
    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  }
  return res.status(500).json({
    success: false,
    message: c.message || "Error deleting project",
  });
};

const editProjectController = async (req, res) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;
  const { name } = req.body;

  const result = await editProjectService(userId, projectId, name);

  if (result.success) {
    return res.status(200).json({
      success: true,
      message: "Project edited successfully",
    });
  }
  return res.status(500).json({
    success: false,
    message: result.message || "Error editing project",
  });
};

module.exports = {
  createProjectController,
  getProjectsController,
  getProjectController,
  deleteProjectController,
  editProjectController,
};
