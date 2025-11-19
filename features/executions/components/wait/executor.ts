import type { NodeExecutor } from "@/features/executions/types";
import { waitChannel } from "@/inngest/channels/wait";

type WaitData = {
  duration: number;
  unit: "seconds" | "minutes" | "hours" | "days";
};

export const waitExecutor: NodeExecutor<WaitData> = async ({
  nodeId,
  data,
  step,
  publish,
}) => {
  await publish(
    waitChannel().status({
      nodeId,
      status: "loading",
    })
  );

  const duration = Number(data.duration) || 1;
  const unit = data.unit || "minutes";

  let ms = 0;
  switch (unit) {
    case "seconds":
      ms = duration * 1000;
      break;
    case "minutes":
      ms = duration * 60 * 1000;
      break;
    case "hours":
      ms = duration * 60 * 60 * 1000;
      break;
    case "days":
      ms = duration * 24 * 60 * 60 * 1000;
      break;
  }

  // Inngest sleep expects a string like "1m", "1h" or milliseconds number
  // Using milliseconds for precision
  await step.sleep("wait-step", ms);

  await publish(
    waitChannel().status({
      nodeId,
      status: "success",
    })
  );

  return { waited: true, duration, unit };
};
