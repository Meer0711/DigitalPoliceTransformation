import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    roomId: v.string(),
    userId: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_room", ["roomId"]),

  rooms: defineTable({
    name: v.string(),
    owner: v.string(),
    createdAt: v.number(),
  }),
});