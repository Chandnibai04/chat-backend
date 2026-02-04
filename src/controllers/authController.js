import User from "../models/User.model.js";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await hashPassword(password);
  const user = await User.create({ name, email, password: hashed, role });
  res.status(201).json({ token: generateToken(user), user: { id: user._id, name, email, role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  res.json({ token: generateToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};
