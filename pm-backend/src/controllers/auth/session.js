const jwt = require("jsonwebtoken");

const session = async (req, res) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  res.status(200).json({ success: true, user });
};

module.exports = { session };
