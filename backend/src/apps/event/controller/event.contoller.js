import { db } from "../../../db/index.js";
import { event } from "../../../db/schema/schema.js";
import { eq } from "drizzle-orm";
import {
  createEvent,
  listAllEvents,
  listUserEvents,
} from "../model/event.model.js";

export const eventController = {
  async event(req, res) {
    try {
      const { title, content } = req.body;

      const userId = req.user.id;

      const newEvent = await createEvent({ title, content, userId });

      res.status(201).json({
        success: true,
        event: newEvent,
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async listEvents(req, res) {
    try {
      const events = await listAllEvents();
      res.status(200).json({ success: true, events });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async UserEvents(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(400).json({ message: "Missing user id" });
      const events = await listUserEvents(userId);
      res.status(200).json({ success: true, events });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async updateEvent(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      // Fetch the event first
      const existing = await db.select().from(event).where(eq(event.id, id));
      if (!existing.length) throw new Error("Event not found");

      const evt = existing[0];

      // Only owner or admin can edit
      if (evt.userId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Not allowed" });
      }

      const updated = await db
        .update(event)
        .set({ title, content })
        .where(eq(event.id, id))
        .returning();

      res.json({ success: true, event: updated[0] });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async deleteEvent(req, res) {
    try {
      const { id } = req.params;

      // Fetch the event first
      const existing = await db.select().from(event).where(eq(event.id, id));
      if (!existing.length) throw new Error("Event not found");

      const evt = existing[0];

      // Only owner or admin can delete
      if (evt.userId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Not allowed" });
      }

      await db.delete(event).where(eq(event.id, id));

      res.json({ success: true, message: "Event deleted" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
