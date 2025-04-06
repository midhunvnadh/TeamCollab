const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
const { session: sessionMW } = require("./middlewares/sessionMW");
const { signup } = require("./controllers/auth/signup");
const { signin } = require("./controllers/auth/signin");
const { session } = require("./controllers/auth/session");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/signup", signup);
app.use("/auth/session", sessionMW);
app.get("/auth/session", session);
app.post("/auth/signin", signin);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
