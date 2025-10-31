"use client";

import type { Node, NodeProps } from "@xyflow/react";
import { BaseExecutionNode } from "@/components/base-execution-node";
import { memo } from "react";
import { GlobeIcon } from "lucide-react";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HttprequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttprequestNodeType>) => {
  const nodeData = props.data as HttpRequestNodeData;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "Not configured";

  return (
    <>
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        onSettings={() => {}}
        onDoubleClick={() => {}}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
