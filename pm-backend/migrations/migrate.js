const dotenv = require("dotenv");
dotenv.config();
const { query, transaction } = require("../src/lib/db");

const readFile = (path) => {
  const fs = require("fs");
  return fs.readFileSync(path, "utf8");
};

const sql = readFile("migrations/init.sql");

transaction(async () => {
  const queries = sql.split(";");
  for (const q of queries) {
    await query(q.trim());
  }
  return true;
}).then((d) => {
  console.log(d);
});
