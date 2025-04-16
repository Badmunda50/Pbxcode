import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "sqlite", // Change dialect to SQLite
  dbCredentials: {
    url: "file:./sqlite-database.db", // SQLite database file
  },
  verbose: true, // Verbose output for better debugging
  strict: true,
});
