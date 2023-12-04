import authMiddleware from "../middleware/auth.js";
import express from "express";
import {
  patients,
  createPatient,
  fetchPatient,
  updatePatient,
  deletePatient,
  customerOrders,
  fetchCustomerOrder,
  updateCustomerOrder,
} from "../controller/patients.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/", authMiddleware, patients);
router.post("/", authMiddleware, createPatient);

router.get("/customerOrders", authMiddleware, customerOrders);
router
  .route("/:id")
  .get(authMiddleware, fetchPatient)
  .put(authMiddleware, updatePatient)
  .delete(authMiddleware, deletePatient);

router
  .route("/customerOrders/:id")
  .get(authMiddleware, fetchCustomerOrder)
  .put(authMiddleware, updateCustomerOrder);
export default router;
