"use server";

import { inngest } from "@/inngest/client";
import { getSubscriptionToken, Realtime } from "@inngest/realtime";
import { slackChannel } from "@/inngest/channels/slack";

export type SlackToken = Realtime.Token<typeof slackChannel, ["status"]>;

export async function fetchSlackToken(): Promise<SlackToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: slackChannel(),
    topics: ["status"],
  });

  return token;
}
