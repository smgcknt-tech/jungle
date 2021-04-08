import express from "express";
import { getTop } from "../controllers/TopController.js";
const router = express.Router();

router.get("/", getTop);

export default router;
