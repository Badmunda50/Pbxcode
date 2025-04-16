import { ObjectId } from "mongodb";
import { db } from "../config/database";

// Define the "games" collection schema
export const gamesCollection = db.collection("games");

// Define the "guesses" collection schema
export const guessesCollection = db.collection("guesses");

// Define the "users" collection schema
export const usersCollection = db.collection("users");

// Define the "leaderboard" collection schema
export const leaderboardCollection = db.collection("leaderboard");

// Define the "banned_users" collection schema
export const bannedUsersCollection = db.collection("banned_users");

// Example: Inserting a game document
export const createGame = async (data: {
  word: string;
  activeChat: string;
  createdAt?: Date;
  updatedAt?: Date;
}) => {
  const game = {
    ...data,
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  };
  return await gamesCollection.insertOne(game);
};

// Example: Inserting a guess document
export const createGuess = async (data: {
  guess: string;
  gameId: ObjectId;
  chatId: string;
  createdAt?: Date;
  updatedAt?: Date;
}) => {
  const guess = {
    ...data,
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  };
  return await guessesCollection.insertOne(guess);
};

// Example: Inserting a user document
export const createUser = async (data: {
  name: string;
  username?: string;
  telegramUserId: string;
  createdAt?: Date;
  updatedAt?: Date;
}) => {
  const user = {
    ...data,
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  };
  return await usersCollection.insertOne(user);
};

// Example: Inserting a leaderboard entry
export const createLeaderboardEntry = async (data: {
  userId: ObjectId;
  chatId: string;
  score: number;
  createdAt?: Date;
  updatedAt?: Date;
}) => {
  const leaderboardEntry = {
    ...data,
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  };
  return await leaderboardCollection.insertOne(leaderboardEntry);
};

// Example: Inserting a banned user document
export const createBannedUser = async (data: {
  userId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}) => {
  const bannedUser = {
    ...data,
    createdAt: data.createdAt || new Date(),
    updatedAt: data.updatedAt || new Date(),
  };
  return await bannedUsersCollection.insertOne(bannedUser);
};

export const bannedUsersTable = pgTable("banned_users", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});
