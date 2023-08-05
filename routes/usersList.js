import express from "express";
import { getMainProducts } from "../controllers/userList.js";

const router = express();

router.get("/", getMainProducts);
export default router;
