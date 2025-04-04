const query = require("../lib/db");

const createUser = async (username, password) => {
  const result = await query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
    [username, password]
  );
  console.log(result);
  return result[0].id;
};

module.exports = {
  createUser,
};
