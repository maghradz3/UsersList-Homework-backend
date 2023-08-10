import express from "express";
import { getMainUsers } from "../controllers/userList.js";
import { deleteUser } from "../controllers/userList.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/userList", getMainUsers);
router.delete("/userList/:id", authMiddleware, deleteUser);

export default router;
