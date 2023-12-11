const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const  userRoutes  = require("./routes/userRoutes");
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");


// Load environment variables
require("dotenv").config();

// Use express
const app = express();

// Middleware
app.use(cors()); // Allow requests from different hosts
app.use(express.json()); // Parse incoming data as JSON

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

// Connect to the database
mongoose.connect(
  `mongodb://127.0.0.1:27017/Chat-App-DB`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log("Connection to the database established");
    // Start the server after successful database connection
  })
  .catch(err => {
    console.error("Error connecting to the database:", err);
  });
  const PORT = process.env.PORT||5000;
  const server =   app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });

  const io = socket(server,{
      cors:{
        origin:"http://localhost:3000",
        credentials:true,
      }
  })

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

