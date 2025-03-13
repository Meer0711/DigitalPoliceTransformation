import { mutation, query } from "./_generated/server";

export const sendMessage = mutation(async ({ db }, { roomId, userId, content }) => {
  return await db.insert("messages", { roomId, userId, content, createdAt: Date.now() });
});

export const getMessages = query(async ({ db }, { roomId }) => {
  return await db.query("messages").withIndex("by_room", (q) => q.eq("roomId", roomId)).order("desc").take(50);
});