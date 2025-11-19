"use server";

import { inngest } from "@/inngest/client";
import { getSubscriptionToken, Realtime } from "@inngest/realtime";
import { emailChannel } from "@/inngest/channels/email";

export type EmailToken = Realtime.Token<typeof emailChannel, ["status"]>;

export async function fetchEmailRealtimeToken(): Promise<EmailToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: emailChannel(),
    topics: ["status"],
  });

  return token;
}
