import type { Node, NodeProps } from "@xyflow/react";
import { memo } from "react";
import { BaseTriggerNode } from "../components/base-trigger-node";
import { MousePointerIcon } from "lucide-react";

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <>
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="When clicked 'Execute workflow'"
        // status={nodeStatus}
        // onSettings={handleOpenSettings}
        // onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
