const express = require("express");
const { signup } = require("../controllers/auth/signup");
const { signin } = require("../controllers/auth/signin");
const { session } = require("../controllers/auth/session");
const { sessionMW } = require("../middlewares/sessionMW");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.use(sessionMW);
router.get("/session", session);

module.exports = router;
