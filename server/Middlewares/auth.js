import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header("Auth");

    if (!token) return res.json({ message: "login first" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.userId;

    let user = await User.findById(id);

    if (!user) return res.json({ message: "user does not exist" });

    req.user = user;

    next();
  } catch (err) {
    console.log("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token, please login again" });
  }
};
