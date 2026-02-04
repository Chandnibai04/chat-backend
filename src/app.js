// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/message.js";

dotenv.config();
connectDB();

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(cors({
  origin: process.env.FRONTEND_URL,  // use env variable
  credentials: true,
}));


app.use(express.json()); // parse JSON bodies

// -------------------- ROUTES --------------------
app.get("/", (req, res) => res.send("API is running"));

// Auth routes
app.use("/api/auth", authRoutes);

// User routes
app.use("/api/users", userRoutes);

// Chat & message routes
app.use("/api/chat", chatRoutes);
app.use("/api/messages", messageRoutes);

// -------------------- 404 HANDLER --------------------
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// -------------------- ERROR HANDLER --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
