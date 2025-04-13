let io;

module.exports = {
  init: (socketIO) => {
    io = socketIO;
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
  emitNotification: (type, data) => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    io.emit("notification", { type, data });
  },
  emitTaskUpdate: (type, data) => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    io.emit("taskUpdate", { type, data });
  },
};
