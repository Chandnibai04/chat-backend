import { Router } from "express";
import { signup, login, forgotPassword, resetPassword, updateUser } from "../controllers/user.Controller.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import User from "../models/User.model.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/:id", updateUser);

// Get logged-in user profile
router.get("/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Get all users (for chat user list)
router.get("/", authenticate, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
