const projectMembersController = (req, res) => {
  const { projectId } = req.params;
  return res.json({ projectId });
};

module.exports = {
  projectMembersController,
};
