import authMiddleware from "../middleware/auth.js";
import express from "express";
import {
  fetchbilling,
  createBilling,
  deleteBilling,
} from "../controller/billing.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/", authMiddleware, fetchbilling);
router.post("/", authMiddleware, createBilling);

router
  .route("/:id")
  //   .get(authMiddleware, findPatientReq)
  //   //   .put(authMiddleware, updatePatient)
  .delete(authMiddleware, deleteBilling);

export default router;
