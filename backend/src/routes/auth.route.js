import express from "express";
import { authController } from "../apps/auth/controller/auth.controller.js";
import { authenticate } from "../middleware/jwt.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);

router.get("/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default router;
