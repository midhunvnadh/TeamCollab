const jwt = require("jsonwebtoken");

const session = async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    return res
      .status(200)
      .json({ success: true, message: "Session valid", user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { session };
