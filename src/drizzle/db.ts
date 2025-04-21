import mongoose from "mongoose";
import { env } from "../config/env";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.DATABASE_URI);
    if (env.NODE_ENV === "development") {
      console.log("MongoDB connected");
    }
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
