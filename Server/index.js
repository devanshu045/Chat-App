const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const  userRoutes  = require("./routes/userRoutes");

// Load environment variables
require("dotenv").config();

// Use express
const app = express();

// Middleware
app.use(cors()); // Allow requests from different hosts
app.use(express.json()); // Parse incoming data as JSON

// Routes
console.log(userRoutes);
app.use("/api/auth", userRoutes);

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
    const PORT = process.env.PORT||5000;
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Error connecting to the database:", err);
  });
