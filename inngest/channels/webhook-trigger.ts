import { channel, topic } from "@inngest/realtime";

export const WEBHOOK_TRIGGER_CHANNEL_NAME = "webhook-trigger";

export const webhookTriggerChannel = channel(
  WEBHOOK_TRIGGER_CHANNEL_NAME
).addTopic(
  topic("status").type<{
    nodeId: string;
    status: "loading" | "success" | "failed";
  }>()
);
