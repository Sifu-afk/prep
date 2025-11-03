import { db } from "../../../db/index.js";
import { event } from "../../../db/schema/schema.js";
import { getEventByTitle } from "../model/event.model.js";

export async function makeEvent({
  title,
  content,
  userId,
  category,
  address,
  image,
  date,
}) {
  const existing = await getEventByTitle(title);
  if (existing) throw new Error("Title already exists");

  const result = await db
    .insert(event)
    .values({
      title,
      content,
      userId,
      category,
      address,
      date,
    })
    .run();

  return {
    id: result.lastInsertRowid,
    title,
    content,
    userId,
    category,
    address,
    image,
    date,
  };
}
