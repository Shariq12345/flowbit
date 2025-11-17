"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { BaseExecutionNode } from "@/components/base-execution-node";
import { memo, useState } from "react";
import { SlackDialog, SlackFormValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchSlackToken } from "./actions";
import { SLACK_CHANNEL_NAME } from "@/inngest/channels/slack";

type SlackNodeData = {
  webhookUrl?: string;
  content?: string;
};

type SlackNodeType = Node<SlackNodeData>;

export const SlackNode = memo((props: NodeProps<SlackNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const nodeData = props.data;
  const description = nodeData?.content
    ? `Send: ${nodeData.content.slice(0, 50)}`
    : `Not configured`;

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: SLACK_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchSlackToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: SlackFormValues) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }
        return node;
      })
    );
  };
  return (
    <>
      <SlackDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={"/slack.svg"}
        name="Slack"
        status={nodeStatus}
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

SlackNode.displayName = "SlackNode";
