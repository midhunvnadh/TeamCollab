const { createUserService } = require("../../services/userService");

const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Name and password are required" });
  }

  const result = await createUserService({ username, password });

  if (result.success) {
    return res.status(201).json({ success: true, message: result.message });
  }
  return res.status(400).json({ success: false, message: result.message });
};

module.exports = { signup };
