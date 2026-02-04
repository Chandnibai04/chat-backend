import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { sendMessage } from "../controllers/chatController.js";

const router = express.Router();

// Send message
router.post("/send", authenticate, sendMessage);

export default router;
