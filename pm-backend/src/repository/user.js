const { query } = require("../lib/db");

const createUser = async (username, password) => {
  const result = await query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
    [username, password]
  );
  console.log(result);
  return result[0].id;
};

const getUserByUsername = async (username) => {
  const result = await query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result?.[0];
};

const getUserById = async (id) => {
  const result = await query("SELECT * FROM users WHERE id = $1", [id]);
  return result?.[0];
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
};
