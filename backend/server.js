// Import required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
// Create an Express application
const app = express();

// ---------- App Configuration ----------

// Parse incoming requests with JSON payloads
connectDB(); //DB connection
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());

// ---------- Routes ----------

// Default route - responds to any request to "/"
app.use("/", (req, res) => {
  res.json("API WORKING ⚒️"); // Sends a JSON response
});

// ---------- Server Setup ----------

// Choose the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen on the selected port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} : http://localhost:${PORT}`);
});
