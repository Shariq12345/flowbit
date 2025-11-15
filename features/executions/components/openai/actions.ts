"use server";

import { inngest } from "@/inngest/client";
import { getSubscriptionToken, Realtime } from "@inngest/realtime";
import { openAIChannel } from "@/inngest/channels/openai";

export type OpenAIToken = Realtime.Token<typeof openAIChannel, ["status"]>;

export async function fetchOpenAIToken(): Promise<OpenAIToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: openAIChannel(),
    topics: ["status"],
  });

  return token;
}
