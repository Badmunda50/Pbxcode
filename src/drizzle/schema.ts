import mongoose from "mongoose";

const { Schema, model } = mongoose;

const gameSchema = new Schema({
  word: { type: String, required: true, maxlength: 5 },
  activeChat: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const guessSchema = new Schema({
  guess: { type: String, required: true, maxlength: 5 },
  gameId: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  chatId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String },
  telegramUserId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const leaderboardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  chatId: { type: String, required: true },
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const bannedUserSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Models
export const Game = model("Game", gameSchema);
export const Guess = model("Guess", guessSchema);
export const User = model("User", userSchema);
export const Leaderboard = model("Leaderboard", leaderboardSchema);
export const BannedUser = model("BannedUser", bannedUserSchema);
