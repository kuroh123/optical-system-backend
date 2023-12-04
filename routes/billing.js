import authMiddleware from "../middleware/auth.js";
import express from "express";
import {
  fetchBilling,
  createDirectBilling,
  deleteBilling,
  fetchBillings,
  fetchTransactions,
  createTransaction,
  deleteTransaction,
} from "../controller/billing.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/", authMiddleware, fetchBillings);
router.post("/direct/", authMiddleware, createDirectBilling);

router
  .route("/transactions")
  .get(authMiddleware, fetchTransactions)
  .post(authMiddleware, createTransaction);

router
  .route("/:id")
  .get(authMiddleware, fetchBilling)
  .delete(authMiddleware, deleteBilling);

router.delete("/transactions/:id", authMiddleware, deleteTransaction);

export default router;
