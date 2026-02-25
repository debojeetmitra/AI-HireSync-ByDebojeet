"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";

export const streamTokenProvider = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const streamClient = StreamChat.getInstance(
    process.env.STREAM_API_KEY!,
    process.env.STREAM_API_SECRET!
  );

  const token = streamClient.createToken(user.id);

  return token;
};
