const express = require("express");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const http = require("http");
const socketUtil = require("./lib/socket");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Initialize socket utility
socketUtil.init(io);

const port = process.env.PORT || 4000;

const { applyGlobalMiddlewares } = require("./middlewares/globalMiddlewares");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

applyGlobalMiddlewares(app);

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/projects", taskRoutes);
app.use("/", notificationRoutes);

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Change app.listen to server.listen
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
