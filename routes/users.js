import express from "express";
import { users, register, login } from "../controller/users.js";
const router = express.Router();

// router.route("/").get(users);
router.get("/users", users);
router.post("/register", register);

router.post("/login", login);

export default router;
