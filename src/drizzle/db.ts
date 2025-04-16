// Uncomment the SQLite section
import { drizzle as drizzleSQLite } from "drizzle-orm/better-sqlite3"; // SQLite support
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqliteDB = new Database("sqlite-database.db"); // SQLite database file
export const sqliteDb = drizzleSQLite(sqliteDB, {
  schema,
  logger: process.env.NODE_ENV === "development",
});

// Comment out the PostgreSQL section if not needed
// import { drizzle } from "drizzle-orm/node-postgres";
// export const db = drizzle(process.env.DATABASE_URI, {
//   schema,
//   logger: process.env.NODE_ENV === "development",
// });
