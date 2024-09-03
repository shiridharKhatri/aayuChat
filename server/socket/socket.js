const socket = require("socket.io");
const connectToSocket = (server) => {
  let io = socket(server, {
    cors: {
      origin: ["http://localhost:5000", "http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });
  const user = [];
  io.on("connection", (socket) => {
    console.log(socket.id, "Connected");
    socket.on("user-online", (userId) => {
      let users = user.find((data) => data.id === userId);
      if (!users) {
        user.push({
          id: userId,
          socketId: socket.id,
          isOnline: true,
          offlineDate: null,
        });
      } else {
        (users.socketId = socket.id),
          (users.isOnline = true),
          (users.offlineDate = null);
      }
      io.emit("online-data", user);
    });
    socket.on("filter-user", (data) => {
      let findUser = user.find((e) => e.id === data.receiver);
      let messageData = {
        data: {
          _id: data.random8DigitNumber,
          content: data.value,
          reply: data.reply,
          date: new Date(),
        },
        sender: data.id,
        receiver: data.receiver,
        date: new Date(),
      };
      if (!findUser) {
        console.log("User not found");
      } else {
        io.to(findUser.socketId).emit("receive-message", messageData);
      }
    });
    socket.on("is-typing", (data) => {
      let findUser = user.find((e) => e.id === data.receiver);
      if (!findUser) {
        console.log("User not found");
      } else {
        io.to(findUser.socketId).emit("typing-status", data);
      }
    });
    socket.on("disconnect", () => {
      console.log(socket.id, "Disconnected");
      let index = user.findIndex((data) => data.socketId === socket.id);
      if (index !== -1) {
        user[index].isOnline = false;
        user[index].offlineDate = new Date();
      } else {
        console.log("No User found");
      }
      io.emit("online-data", user);
    });
  });
  return io;
};
module.exports = connectToSocket;
