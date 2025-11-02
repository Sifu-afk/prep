import bcrypt from "bcryptjs";
import { users } from "./schema.js";
import { db } from "../index.js";

async function seed() {
  const username = "admin";
  const email = "admin@local.com";
  const password = "admin";

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = db
    .insert(users)
    .values({
      username,
      email,
      password: hashedPassword,
      isAdmin: 1,
    })
    .run();

  console.log("✅ Admin user created:", result);
}

seed();
