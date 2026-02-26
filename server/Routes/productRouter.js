import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../Controllers/product.js";

const router = express.Router();

// /api/product/add
router.post("/add", addProduct);

// /api/product/showAll

router.get("/showAll", getProducts);

// /api/product/find/id
router.get("/find/:id", getProductById);

// /api/product/update/id

router.put("/update/:id", updateProduct);

// /api/product/delete/id

router.delete("/delete/:id", deleteProduct);
export default router;
