import authMiddleware from "../middleware/auth.js";
import express from "express";
import {
  eyeDetails,
  createEyeDetail,
  findEyeDetail,
  deleteEyeDetail,
} from "../controller/eyeDetail.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/", authMiddleware, eyeDetails);
router.post("/", authMiddleware, createEyeDetail);

router
  .route("/:id")
  .get(authMiddleware, findEyeDetail)
  //   .put(authMiddleware, updatePatient)
  .delete(authMiddleware, deleteEyeDetail);

export default router;
