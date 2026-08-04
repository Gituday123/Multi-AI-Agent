import express from "express";
import { login } from "../controllers/auth.controllers.js";

const router = express.Router();

// POST /auth/login — Firebase token verification & user upsert
router.post("/login", login);

export default router;
