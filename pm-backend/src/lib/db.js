const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
});

const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res.rows;
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  }
};

const transaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Transaction failed, rolled back:", err.stack);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { query, transaction };
