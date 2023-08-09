import express from "express";
import { getMainUsers } from "../controllers/userList.js";

const router = express();

router.get("/", getMainUsers);
export default router;
