import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getDetailProduct,
  updateProduct,
} from "../Controllers/Product.js";
import { checkPermission } from "../Middlewares/CheckPermission.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getDetailProduct);
router.post("/product", checkPermission, createProduct);
router.put("/product/:id", checkPermission, updateProduct);
router.delete("/product/:id", checkPermission, deleteProduct);

export default router;
