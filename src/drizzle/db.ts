import { drizzle as drizzleSQLite } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqliteDB = new Database("sqlite-database.db");
export const db = drizzleSQLite(sqliteDB, {
  schema,
  logger: process.env.NODE_ENV === "development",
});
