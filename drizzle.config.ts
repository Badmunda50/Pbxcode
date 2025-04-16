export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "mongodb", // Update this to mongodb
  dbCredentials: {
    url: env.DATABASE_URI, // Replace DATABASE_URI with MongoDB URI
  },
  verbose: env.NODE_ENV === "development",
  strict: true,
});
