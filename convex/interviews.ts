import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/* =========================
   GET ALL INTERVIEWS (AUTH)
========================= */
export const getAllInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.query("interviews").collect();
  },
});

/* =========================
   GET MY INTERVIEWS
========================= */
export const getMyInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("interviews")
      .withIndex("by_candidateId", (q) =>
        q.eq("candidateId", identity.subject)
      )
      .collect();
  },
});

/* =========================
   GET INTERVIEW BY STREAM ID
========================= */
export const getInterviewByStreamCallId = query({
  args: { streamCallId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("interviews")
      .withIndex("by_stream_call_id", (q) =>
        q.eq("streamCallId", args.streamCallId)
      )
      .first();
  },
});

/* =========================
   CREATE INTERVIEW (SAFE)
========================= */
export const createInterview = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    status: v.string(),
    streamCallId: v.string(),
    candidateId: v.string(),
    interviewerIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("interviews", {
      ...args,
    });
  },
});

/* =========================
   UPDATE INTERVIEW STATUS
========================= */
export const updateInterviewStatus = mutation({
  args: {
    id: v.id("interviews"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      status: args.status,
      ...(args.status === "completed"
        ? { endTime: Date.now() }
        : {}),
    });
  },
});
