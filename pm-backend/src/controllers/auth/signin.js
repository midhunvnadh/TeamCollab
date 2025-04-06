const { getUserByUsername } = require("../../repository/user");
const jwt = require("jsonwebtoken");
signin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Name and password are required" });
  }
  const existingUser = await getUserByUsername(username);
  if (!existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User does not exist" });
  }
  if (existingUser.password !== password) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });
  }
  const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
  res.status(200).json({ success: true, token });
};

module.exports = { signin };
