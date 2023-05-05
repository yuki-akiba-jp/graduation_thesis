const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const registerTeams = require("./routes/teams");

app.use(express.json());
app.use(cors());
app.use("/api/teams", require("./routes/teams"));
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_team", (data) => {
    socket.join(data);
  });

  socket.on("post_name", (data) => {
    console.log(data.name);
    // io.to(data.team).emit("members", team);
  });
});
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("mongodb connected");
});
const PORT = 5000;
server.listen(PORT, () => console.log("server running"));

// const userRoute = require("./routes/users");
// const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");
// const uploadRoute = require("./routes/upload");
// const bodyParser = require("body-parser");
// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");

// app.use("/api/users", require("./routes/users"));
// app.use("/api/auth", authRoute);

// app.use("/api/users", userRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/posts", postRoute);
// app.use("/api/upload", uploadRoute);

// app.get("/", (req, res) => {
//   res.send("hello mernstack");
// });

// app.get("/users", (req, res) => {
//   res.send("user pages");
// });
