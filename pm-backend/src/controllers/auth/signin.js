const { getUserByUsername } = require("../../repository/user");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Name and password are required" });
  }

  try {
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
    return res
      .status(200)
      .json({ success: true, message: "Signin successful", token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { signin };
