import authMiddleware from "../middleware/auth.js";
import express from "express";
import {
  patients,
  createPatient,
  fetchPatient,
  updatePatient,
  deletePatient,
} from "../controller/patients.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/", authMiddleware, patients);
router.post("/", authMiddleware, createPatient);

router
  .route("/:id")
  .get(authMiddleware, fetchPatient)
  .put(authMiddleware, updatePatient)
  .delete(authMiddleware, deletePatient);

export default router;
