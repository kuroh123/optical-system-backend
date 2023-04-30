import authMiddleware from "../middleware/auth.js";
import express from "express";
import {
  fetchBilling,
  createBilling,
  deleteBilling,
  fetchBillings,
  updateBilling,
} from "../controller/billing.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/", authMiddleware, fetchBillings);
router.post("/", authMiddleware, createBilling);

router
  .route("/:id")
  .get(authMiddleware, fetchBilling)
  .put(authMiddleware, updateBilling)
  .delete(authMiddleware, deleteBilling);

export default router;
