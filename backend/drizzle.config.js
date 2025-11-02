import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/schema.js",  // relative path from backend/
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./database.db",           // the DB file you want to use
  },
});
