import type { NodeExecutor } from "@/features/executions/types";
import { webhookTriggerChannel } from "@/inngest/channels/webhook-trigger";

type WebhookTriggerData = Record<string, unknown>;

export const webhookTriggerExecutor: NodeExecutor<WebhookTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    webhookTriggerChannel().status({
      nodeId,
      status: "loading",
    })
  );

  // The context already contains the webhook body from the initial event
  const result = await step.run("webhook-trigger", async () => context);

  await publish(
    webhookTriggerChannel().status({
      nodeId,
      status: "success",
    })
  );

  return result;
};
