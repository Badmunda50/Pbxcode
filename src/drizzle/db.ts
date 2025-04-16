// Uncomment the desired drizzle import based on the environment
// import { drizzle } from "drizzle-orm/neon-http";
import { drizzle } from "drizzle-orm/node-postgres";
import { drizzle as drizzleSQLite } from "drizzle-orm/better-sqlite3"; // SQLite support

import { env } from "../config/env";
import * as schema from "./schema";

// For PostgreSQL
export const db = drizzle(env.DATABASE_URI, {
  schema,
  logger: env.NODE_ENV === "development",
});

// For SQLite (automatically creates and runs the database)
import Database from "better-sqlite3";
const sqliteDB = new Database("sqlite-database.db"); // SQLite database file

export const sqliteDb = drizzleSQLite(sqliteDB, {
  schema,
  logger: env.NODE_ENV === "development",
});
