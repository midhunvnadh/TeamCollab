const jwt = require("jsonwebtoken");
const { getUserById } = require("../repository/user");

const sessionMW = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")?.[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const db_user = await getUserById(decoded.id);

    if (!db_user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = {
      ...decoded,
      id: db_user.id,
      username: db_user.username,
    };

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized", error });
  }
};

module.exports = { sessionMW };
