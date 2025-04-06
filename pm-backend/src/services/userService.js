const { createUser, getUserByUsername } = require("../repository/user");

const createUserService = async ({ username, password }) => {
  if (!username || !password) {
    return { success: false, message: "Name and password are required" };
  }
  // Check if the user already exists
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  if (await createUser(username, password)) {
    return { success: true };
  }
  return { success: false, message: "Something went wrong" };
};

module.exports = { createUserService };
