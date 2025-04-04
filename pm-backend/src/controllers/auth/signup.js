const { createUserService } = require("../../services/userService");

const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Name and password are required" });
  }

  const result = await createUserService({ username, password });

  if (result.success) {
    return res.status(201).json({ message: "User created successfully" });
  }
  return res.status(500).json({ error: result.error });
};

module.exports = { signup };
