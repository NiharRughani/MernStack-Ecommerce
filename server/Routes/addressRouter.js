import express from "express";
import { addAddress, getAddress } from "../Controllers/address.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

//address router

//add address
// /api/address/add

router.post("/add", isAuthenticated, addAddress);
//find first address
//api/address/get
router.get("/get", isAuthenticated, getAddress);

export default router;
