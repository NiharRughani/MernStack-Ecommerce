import express from "express";
import {
  addToCart,
  clearCart,
  decreaseQtyFromCart,
  removeItemFromCart,
  userCart,
} from "../Controllers/cart.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

// /api/cart/add

router.post("/add", isAuthenticated, addToCart);

//  /api/cart/find

router.get("/find", isAuthenticated, userCart);

// api/cart/remove/productId

router.delete("/remove/:productId", isAuthenticated, removeItemFromCart);

//  api/cart/--qty

router.post("/--qty", isAuthenticated, decreaseQtyFromCart);

// api/cart/clear

router.delete("/clear", isAuthenticated, clearCart);

export default router;
