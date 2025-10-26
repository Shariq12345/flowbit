import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface WorkflowIdProps {
  params: Promise<{ workflowId: string }>;
}

const WorkflowId = async ({ params }: WorkflowIdProps) => {
  await requireAuth();

  const { workflowId } = await params;
  return <div>WorkflowId: {workflowId}</div>;
};

export default WorkflowId;
