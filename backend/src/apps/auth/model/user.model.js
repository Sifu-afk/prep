import { db } from "../../../db/index.js";
import { users } from "../../../db/schema/schema.js";
import { eq } from "drizzle-orm";

export async function createUser({ username, email, password }) {
  await db.insert(users).values({ username, email, password });
}

export async function getUserByEmail(email) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  return result[0];
}

