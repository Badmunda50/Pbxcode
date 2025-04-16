import { MongoClient } from "mongodb";

const client = new MongoClient(env.DATABASE_URI);

export const db = client.db();
