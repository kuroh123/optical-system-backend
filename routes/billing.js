import authMiddleware from "../middleware/auth.js";
import express from "express";
import {
  fetchBilling,
  createBilling,
  createDirectBilling,
  deleteBilling,
  fetchBillings,
  updateBilling,
} from "../controller/billing.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/", authMiddleware, fetchBillings);
router.post("/", authMiddleware, createBilling);
router.post("/direct/", authMiddleware, createDirectBilling);

router
  .route("/:id")
  .get(authMiddleware, fetchBilling)
  .put(authMiddleware, updateBilling)
  .delete(authMiddleware, deleteBilling);

export default router;
