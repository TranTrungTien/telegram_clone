const express = require("express");
const app = express();
const cors = require("cors");
const DB = require("./Models/database");
const server = require("http").createServer(app);
const userRoute = require("./Router/userRoute");
const conversationRoute = require("./Router/conversationRoute");
const messageRoute = require("./Router/messageRoute");
const attachmentRoute = require("./Router/attachmentsRoute");
const assetRoute = require("./Router/assetRoute");
const PORT = process.env.PORT || 8080;
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

DB();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/attachments", attachmentRoute);
app.use("/api/assets", assetRoute);

// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   console.log({ token });
//   if (!token) {
//     return next(new Error("Not Authorized"));
//   }
//   const hasPermission = jwt.verify(token, jwtSecretKey);
//   if (hasPermission) {
//     return next();
//   } else {
//     return next(new Error("Not Authorized"));
//   }
// });

io.on("connection", (socket) => {
  console.log("id of socket : ", socket.id);
  //socket.emit("connected", { message: "connected" });
  socket.on("join-rooms", (roomsList) => {
    console.log({ roomsList });
    socket.join(roomsList);
  });
  socket.on("send-message", (data) => {
    console.log({ data });
    io.in(data?.conversation_id).emit("receive-message", data);
  });
  socket.on("s_files", (filesList, conversation_id) => {
    console.log({ filesList });
    io.in(conversation_id).emit("r_files", filesList);
  });

  socket.on("disconnect", () => {
    console.log("User has disconnected");
  });
});

server.listen(PORT, () => console.log("Server is running on ", PORT));
