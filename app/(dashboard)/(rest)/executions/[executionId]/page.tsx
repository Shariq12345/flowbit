import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface ExecutionIdProps {
  params: Promise<{ executionId: string }>;
}

const ExecutionId = async ({ params }: ExecutionIdProps) => {
  await requireAuth();

  const { executionId } = await params;
  return <div>ExecutionId: {executionId}</div>;
};

export default ExecutionId;
