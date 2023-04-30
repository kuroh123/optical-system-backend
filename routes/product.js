import authMiddleware from "../middleware/auth.js";
import express from "express";
import {
  products,
  createProduct,
  fetchProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/", authMiddleware, products);
router.post("/", authMiddleware, createProduct);

router
  .route("/:id")
  .get(authMiddleware, fetchProduct)
  .put(authMiddleware, updateProduct)
  .delete(authMiddleware, deleteProduct);

export default router;
