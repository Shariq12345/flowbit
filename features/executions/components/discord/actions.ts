"use server";

import { inngest } from "@/inngest/client";
import { getSubscriptionToken, Realtime } from "@inngest/realtime";
import { discordChannel } from "@/inngest/channels/discord";

export type DiscordToken = Realtime.Token<typeof discordChannel, ["status"]>;

export async function fetchDiscordToken(): Promise<DiscordToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: discordChannel(),
    topics: ["status"],
  });

  return token;
}
