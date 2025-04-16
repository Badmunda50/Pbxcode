import { MongoClient } from "mongodb";

const client = new MongoClient(env.DATABASE_URI);

export default {
  db: client.db("your_database_name"),
  verbose: env.NODE_ENV === "development",
  strict: true,
};
