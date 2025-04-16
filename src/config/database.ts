import { config } from "dotenv";
config();

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URI!); // Use process.env to access environment variables
