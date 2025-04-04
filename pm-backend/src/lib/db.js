const { Client } = require("pg");
const client = new Client(process.env.DATABASE_URL);

const query = async (text, params) => {
  try {
    await client.connect();
    const res = await client.query(text, params);
    return res.rows;
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};

module.exports = query;
