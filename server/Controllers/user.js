// creating the user
import bcrypt from "bcryptjs";
import { User } from "../Models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      console.log(user);
      return res.json({ message: "user Already exists", success: false });
    }

    const hashPass = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashPass,
    });
    console.log("user is created");
    res.json({ message: "user created succesfully", success: true, user });
  } catch (err) {
    console.log("user is into error");
    res.json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) return res.json({ message: "User not found,", success: false });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.json({ message: "inValid Credential", success: false });
    const token = jwt.sign({ userId: user._id }, "aaslkjfddfs", {
      expiresIn: "365d",
    });
    res.json({ message: `welcome ${user.name}`, token, success: true, user });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get all users

export const getAllUsers = async (req, res) => {
  try {
    let user = await User.find().sort({ createdAt: -1 });
    return res.json({ users: user });
  } catch (err) {
    res.json({ error: err.message });
  }
};

// user profile

export const profile = async (req, res) => {
  res.json({ user: req.user });
};
