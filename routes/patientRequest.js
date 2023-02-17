import authMiddleware from "../middleware/auth.js";
import express from "express";
import {
  patientRequests,
  createPatientRequest,
  findPatientReq,
  deletePatientReq,
} from "../controller/patientRequest.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/", authMiddleware, patientRequests);
router.post("/", authMiddleware, createPatientRequest);

router
  .route("/:id")
  .get(authMiddleware, findPatientReq)
  //   .put(authMiddleware, updatePatient)
  .delete(authMiddleware, deletePatientReq);

export default router;
