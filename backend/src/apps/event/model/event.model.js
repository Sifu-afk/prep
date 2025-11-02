import { db } from "../../../db/index.js";
import { event } from "../../../db/schema/schema.js";
import { eq } from "drizzle-orm";

export async function createEvent({ title, content, userId }) {
  const [newEvent] = await db
    .insert(event)
    .values({ title, content, userId })
    .returning();
  return newEvent;
}

export async function listAllEvents() {
  const events = await db.select().from(event);
  return events;
}

export async function listUserEvents(userId) {
  const events = await db.select().from(event).where(eq(event.userId, userId));
  return events;
}
