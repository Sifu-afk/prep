import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "../model/user.model.js";
import { db } from "../../../db/index.js";
import { users } from "../../../db/schema/schema.js";
import { eq } from "drizzle-orm";

export async function registerUser({ username, email, password }) {
  const existing = await getUserByEmail(email);
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({ username, email, password: hashedPassword });

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();

  const token = jwt.sign(
    { id: user.id, role: user.isAdmin ? "admin" : "user" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { user, token };
}

export async function loginUser(email, password) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user.id, role: user.isAdmin ? "admin" : "user" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { user, token };
}
