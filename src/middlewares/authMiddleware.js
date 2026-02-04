import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select("-password");
    if (!req.user) return res.status(401).json({ error: "Invalid user" });
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
