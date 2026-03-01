require("dotenv").config();

const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is working" });
});

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Error handler 
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API is now online on port ${PORT}`);
  });
}

module.exports = { app };
