import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ workflowId: string }> }
) => {
  const { workflowId } = await params;

  try {
    const body = await req.json();

    await inngest.send({
      name: "workflow/execute-workflow",
      data: {
        workflowId,
        initialData: body,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error triggering webhook workflow:", error);
    return NextResponse.json(
      { error: "Failed to trigger workflow" },
      { status: 500 }
    );
  }
};
