// server.js
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import { initSockets } from "./sockets/chatSocket.js";

dotenv.config(); // Load .env variables

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- Connect to MongoDB ---
mongoose.connect(MONGO_URI) // standard string works reliably
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop server if DB connection fails
  });

// --- Create HTTP server ---
const server = http.createServer(app);

// --- Initialize Socket.IO ---
initSockets(server);

// --- Start server ---
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
