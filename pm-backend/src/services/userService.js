const { createUser } = require("../repository/user");

const createUserService = async ({ username, password }) => {
  if (!username || !password) {
    return { success: false, error: "Name and password are required" };
  }
  if (await createUser(username, password)) {
    return { success: true };
  }
  return { success: false, error: "Something went wrong" };
};

module.exports = { createUserService };
