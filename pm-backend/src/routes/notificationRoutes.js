const express = require("express");
const {
  notificationsController,
} = require("../controllers/utils/notifications");
const { sessionMW } = require("../middlewares/sessionMW");

const router = express.Router();

router.use(sessionMW);
router.get("/notifications", notificationsController);

module.exports = router;
