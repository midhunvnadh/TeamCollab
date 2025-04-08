const jwt = require("jsonwebtoken");
const { getUserById } = require("../repository/user");
const { getProjectsByUserId } = require("../repository/projects");

const accessibleProjectsMW = async (req, res, next) => {
  const { id: userId } = req.user;
  const { projectId } = req.params;

  const projects = await getProjectsByUserId(userId);
  const projectIds = projects.map((project) => project.id);
  const isAccessible = projectIds.includes(+projectId);

  if (!isAccessible) {
    return res.status(403).json({
      success: false,
      message: "You do not have access to this project",
    });
  }

  return next();
};

module.exports = { accessibleProjectsMW };
