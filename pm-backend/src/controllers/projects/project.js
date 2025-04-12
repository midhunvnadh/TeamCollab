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

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Project name is required" });
  }

  try {
    const c = await createProjectService(name, userId);
    if (c.success) {
      return res
        .status(201)
        .json({
          success: true,
          message: "Project created successfully",
          projectId: c.projectId,
        });
    }
    return res
      .status(500)
      .json({ success: false, message: "Error creating project" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProjectsController = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const c = await getProjectsService(userId);
    if (c.success) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Projects fetched successfully",
          projects: c.projects,
        });
    }
    return res
      .status(404)
      .json({ success: false, message: "No projects found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProjectController = async (req, res) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;

  try {
    const c = await getProjectsService(userId, projectId);
    if (c.success) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Project fetched successfully",
          project: c.projects[0],
        });
    }
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProjectController = async (req, res) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;

  try {
    const c = await deleteProjectService(userId, projectId);
    if (c.success) {
      return res
        .status(200)
        .json({ success: true, message: "Project deleted successfully" });
    }
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const editProjectController = async (req, res) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Project name is required" });
  }

  try {
    const result = await editProjectService(userId, projectId, name);
    if (result.success) {
      return res
        .status(200)
        .json({ success: true, message: "Project edited successfully" });
    }
    return res
      .status(404)
      .json({ success: false, message: "Project not found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProjectController,
  getProjectsController,
  getProjectController,
  deleteProjectController,
  editProjectController,
};
