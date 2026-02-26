import express from "express";
import { getAllUsers, login, register, profile } from "../Controllers/user.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

//api/user/register

router.post("/register", register);

//api/user/login

router.post("/login", login);

//api/user/showAll

router.get("/showAll", getAllUsers);

// get user profile

router.get("/profile", isAuthenticated, profile);

export default router;
