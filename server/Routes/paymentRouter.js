import express from "express";
import {
  allOrder,
  checkout,
  userOrder,
  verify,
} from "../Controllers/payment.js";
import { isAuthenticated } from "../Middlewares/auth.js";
const router = express.Router();

//checkout

router.post("/checkout", checkout);

//verify and save to db

router.post("/verify-payment", verify);

//user order
//  /api/payment/userorder
router.get("/userorder", isAuthenticated, userOrder);

//allorders

router.get("/orders", allOrder);

export default router;
