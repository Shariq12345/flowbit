import { memo, useState } from "react";
import { NodeProps } from "@xyflow/react";
import { BaseExecutionNode } from "@/components/base-execution-node";
import { HourglassIcon } from "lucide-react";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { WaitDialog } from "./dialog";
import { WAIT_CHANNEL_NAME } from "@/inngest/channels/wait";
import { fetchWaitRealtimeToken } from "./actions";

export const WaitNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: WAIT_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchWaitRealtimeToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  const duration = (props.data.duration as number) || 1;
  const unit = (props.data.unit as string) || "minutes";

  return (
    <>
      <WaitDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        nodeId={props.id}
        initialDuration={duration}
        initialUnit={unit}
      />
      <BaseExecutionNode
        {...props}
        icon={HourglassIcon}
        name="Wait"
        description={`Wait for ${duration} ${unit}`}
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
