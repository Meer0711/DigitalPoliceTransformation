import { query, mutation } from "./_generated/server";

export const createRoom = mutation(async ({ db }, { name, userId }) => {
  return await db.insert("rooms", { name, owner: userId, createdAt: Date.now() });
});

export const getRooms = query(async ({ db }) => {
  return await db.query("rooms").order("desc").take(50);
});