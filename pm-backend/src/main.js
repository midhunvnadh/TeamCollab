const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
const { signup } = require("./controllers/auth/signup");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/signup", signup);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
