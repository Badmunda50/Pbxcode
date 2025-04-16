import { ObjectId } from "mongodb";
import { db } from "../config/database";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";


// MongoDB Collections
export const gamesCollection = db.collection("games");
export const guessesCollection = db.collection("guesses");
export const usersCollection = db.collection("users");
export const leaderboardCollection = db.collection("leaderboard");
export const bannedUsersCollection = db.collection("banned_users");

// MongoDB Operations

// Insert a game document
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

// Insert a guess document
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

// Insert a user document
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

// Insert a leaderboard entry
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

// Insert a banned user document
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

// PostgreSQL Tables and Relations

// Users Table
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }),
  telegramUserId: varchar("telegram_user_id").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// Games Table
export const gamesTable = pgTable("games", {
  id: serial("id").primaryKey(),
  word: varchar("word", { length: 5 }).notNull(),
  activeChat: text("active_chat").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// Guesses Table
export const guessesTable = pgTable("guesses", {
  id: serial("id").primaryKey(),
  guess: varchar("guess", { length: 5 }).notNull(),
  gameId: integer("game_id")
    .notNull()
    .references(() => gamesTable.id, { onDelete: "cascade" }),
  chatId: varchar("chat_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// Leaderboard Table
export const leaderboardTable = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  chatId: varchar("chat_id").notNull(),
  score: integer("score").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});

// Banned Users Table
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

// Relations
export const gamesRelations = relations(gamesTable, ({ many }) => ({
  guesses: many(guessesTable),
}));

export const guessesRelations = relations(guessesTable, ({ one }) => ({
  game: one(gamesTable, {
    fields: [guessesTable.gameId],
    references: [gamesTable.id],
  }),
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
  leaderboard: many(leaderboardTable),
}));

export const leaderboardRelations = relations(leaderboardTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [leaderboardTable.userId],
    references: [usersTable.id],
  }),
}));
