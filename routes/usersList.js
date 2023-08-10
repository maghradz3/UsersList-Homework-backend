import express from "express";
import { getMainUsers } from "../controllers/userList.js";
import { deleteUser } from "../controllers/userList.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express();

router.get("/users", getMainUsers);
router.delete("/users/:id", deleteUser, authMiddleware);

export default router;
