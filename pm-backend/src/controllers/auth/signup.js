const { createUserService } = require("../../services/userService");

const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Name and password are required" });
  }

  try {
    const result = await createUserService({ username, password });

    if (result.success) {
      return res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    }
    return res.status(400).json({ success: false, message: result.message });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { signup };
