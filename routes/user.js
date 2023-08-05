import express from "express";
import {
  login,
  register,
  getUserInfo,
  refreshToken,
} from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUserInfo);

router.post("/refresh", refreshToken);

router.post("/register", register);

router.post("/login", login);

export default router;
