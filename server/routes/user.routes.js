import express from "express";
import { createUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUserProfile);

export default router;
