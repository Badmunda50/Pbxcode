import { MongoClient } from "mongodb";
import { config } from "dotenv";

config(); // Ensure environment variables are loaded

const client = new MongoClient(process.env.DATABASE_URI!);

export const db = client.db("your-database-name"); // Replace "your-database-name" with your actual database name
