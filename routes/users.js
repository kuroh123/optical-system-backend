import express from "express";
import {
  users,
  register,
  updateUser,
  deleteUser,
  login,
  fetchUser,
} from "../controller/users.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// router.route("/").get(users);
router.get("/users", authMiddleware, users);
router.post("/users", register);

router
  .route("/users/:id")
  .get(authMiddleware, fetchUser)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

router.post("/login", login);

export default router;
