import express from "express";
import authRoutes from "./auth.route.js";
import eventRoutes from './event.route.js';

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/event", eventRoutes);


export default router;
