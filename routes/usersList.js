import express from "express";
import { getMainUsers } from "../controllers/userList.js";
import { deleteUser } from "../controllers/userList.js";

const router = express();

router.get("/", getMainUsers);
router.delete("/:id", deleteUser);
export default router;
