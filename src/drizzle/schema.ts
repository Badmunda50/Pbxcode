import { ObjectId } from "mongodb";
import { db } from "../config/database";
import { pgTable, integer, text, varchar, timestamp, relation } from "drizzle-orm";

// MongoDB Collections
export const gamesCollection = db.collection("games");
export const guessesCollection = db.collection("guesses");
export const usersCollection = db.collection("users");
export const leaderboardCollection = db.collection("leaderboard");
export const bannedUsersCollection = db.collection("banned_users");

// Drizzle ORM Tables
export const gamesTable = pgTable("games", {
  id: integer("id").primaryKey().autoIncrement(),
  word: text("word"),
  activeChat: varchar("active_chat", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const guessesTable = pgTable("guesses", {
  id: integer("id").primaryKey().autoIncrement(),
  guess: text("guess"),
  gameId: integer("game_id"),
  chatId: varchar("chat_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().autoIncrement(),
  name: varchar("name", { length: 255 }),
  username: varchar("username", { length: 255 }),
  telegramUserId: varchar("telegram_user_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const leaderboardTable = pgTable("leaderboard", {
  id: integer("id").primaryKey().autoIncrement(),
  userId: integer("user_id"),
  chatId: varchar("chat_id", { length: 255 }),
  score: integer("score").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const bannedUsersTable = pgTable("banned_users", {
  id: integer("id").primaryKey().autoIncrement(),
  userId: integer("user_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define relationships
export const gamesRelations = relation(gamesTable);
export const guessesRelations = relation(guessesTable);
export const usersRelations = relation(usersTable);
export const leaderboardRelations = relation(leaderboardTable);

// Create Game
export const createGame = async ({
  word,
  activeChat,
  createdAt = new Date(),
  updatedAt = new Date(),
}) => {
  return await gamesCollection.insertOne({ word, activeChat, createdAt, updatedAt });
};

// Create Guess
export const createGuess = async ({
  guess,
  gameId,
  chatId,
  createdAt = new Date(),
  updatedAt = new Date(),
}) => {
  return await guessesCollection.insertOne({ guess, gameId, chatId, createdAt, updatedAt });
};

// Create User
export const createUser = async ({
  name,
  username,
  telegramUserId,
  createdAt = new Date(),
  updatedAt = new Date(),
}) => {
  return await usersCollection.insertOne({ name, username, telegramUserId, createdAt, updatedAt });
};

// Create Leaderboard Entry
export const createLeaderboardEntry = async ({
  userId,
  chatId,
  score = 0,
  createdAt = new Date(),
  updatedAt = new Date(),
}) => {
  return await leaderboardCollection.insertOne({ userId, chatId, score, createdAt, updatedAt });
};

// Create Banned User
export const createBannedUser = async ({
  userId,
  createdAt = new Date(),
  updatedAt = new Date(),
}) => {
  return await bannedUsersCollection.insertOne({ userId, createdAt, updatedAt });
};

// Game with Guesses
export const getGameWithGuesses = async (gameId: ObjectId) => {
  const game = await gamesCollection.findOne({ _id: gameId });
  const guesses = await guessesCollection.find({ gameId }).toArray();
  return { game, guesses };
};

// User with Leaderboard Entries
export const getUserWithLeaderboard = async (telegramUserId: string) => {
  const user = await usersCollection.findOne({ telegramUserId });
  if (!user) return null;
  const leaderboard = await leaderboardCollection.find({ userId: user._id }).toArray();
  return { user, leaderboard };
};

// Leaderboard with User Details
export const getLeaderboardWithUser = async (chatId: string) => {
  return await leaderboardCollection
    .aggregate([
      { $match: { chatId } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $sort: { score: -1 } },
    ])
    .toArray();
};

// Ban Check Helper
export const isUserBanned = async (telegramUserId: string) => {
  const user = await usersCollection.findOne({ telegramUserId });
  if (!user) return false;
  const banned = await bannedUsersCollection.findOne({ userId: user._id });
  return !!banned;
};

// Get Active Game by Chat
export const getActiveGameByChat = async (chatId: string) => {
  return await gamesCollection.findOne({ activeChat: chatId });
};

// Export for usage
export {
  gamesTable,
  guessesTable,
  usersTable,
  leaderboardTable,
  bannedUsersTable,
  gamesRelations,
  guessesRelations,
  usersRelations,
  leaderboardRelations,
};
