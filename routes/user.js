import express from "express";
import {
  login,
  register,
  getUserInfo,
  refreshToken,
  getMainUsers,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUserInfo);

router.post("/refresh", refreshToken);

router.post("/register", register);

router.post("/login", login);

router.get("/userList", getMainUsers);

router.delete("/userList/:id", deleteUser);

export default router;
