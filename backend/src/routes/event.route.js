import express from "express";
import { eventController } from "../apps/event/controller/event.contoller.js";
import { authenticate } from "../middleware/jwt.js";

const router = express.Router();

router.post("/create", authenticate, eventController.event);

router.get("/all", eventController.listEvents);
router.get("/my", authenticate, eventController.UserEvents);

router.put("/:id", authenticate, eventController.updateEvent);
router.delete("/:id", authenticate, eventController.deleteEvent);

export default router;
