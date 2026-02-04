import express from "express";
import { getMessages } from "../controllers/chatController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router();

// GET chat messages with a user
router.get("/messages/:otherUserId", authenticate, getMessages);

export default router;
