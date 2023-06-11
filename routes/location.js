import authMiddleware from "../middleware/auth.js";
import express from "express";
import { locations, userLocationMap } from "../controller/location.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/", authMiddleware, locations);
router.post("/mapUser/", authMiddleware, userLocationMap);

export default router;
