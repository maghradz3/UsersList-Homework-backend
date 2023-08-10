import express from "express";
import {
  login,
  register,
  getUserInfo,
  refreshToken,
  getMainUsers,
  deleteUser,
  blockUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUserInfo);
router.get("/userList/users", getMainUsers);

router.post("/refresh", refreshToken);
router.put("/blockUser/:id", blockUser);

router.post("/register", register);

router.post("/login", login);

router.delete("/userList/:id", deleteUser);

export default router;
