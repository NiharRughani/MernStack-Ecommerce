import jwt from "jsonwebtoken";

import { User } from "../Models/User.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) return res.json({ message: "login  first" });

  const decoded = jwt.verify(token, "aaslkjfddfs");

  console.log(decoded);

  const id = decoded.userId;

  let user = await User.findById(id);

  if (!user) return res.json({ message: "user does not exist" });

  req.user = user;

  //full user is saved inside req.user
  // but we can generally use whole user while working with the id as schema data types have object id as their type

  next();
};
