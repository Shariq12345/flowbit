import { inngest } from "./client";
import prisma from "@/lib/db";
import { NodeType } from "@/lib/generated/prisma/enums";

export const scheduler = inngest.createFunction(
  { id: "scheduler" },
  { cron: "* * * * *" },
  async ({ step }) => {
    const dueWorkflows = await step.run("find-due-workflows", async () => {
      const now = new Date();
      
      // Find all workflows with a SCHEDULE_TRIGGER
      const workflows = await prisma.workflow.findMany({
        where: {
          nodes: {
            some: {
              type: NodeType.SCHEDULE_TRIGGER,
            },
          },
        },
        include: {
          nodes: true,
          executions: {
            orderBy: {
              startedAt: "desc",
            },
            take: 1,
          },
        },
      });

      return workflows.filter((workflow) => {
        const scheduleNode = workflow.nodes.find(
          (n) => n.type === NodeType.SCHEDULE_TRIGGER
        );
        
        if (!scheduleNode) return false;

        const interval = (scheduleNode.data as any).interval || "15m";
        const lastRun = workflow.executions[0]?.startedAt;

        if (!lastRun) return true; // Never run before

        const minutesSinceLastRun =
          (now.getTime() - new Date(lastRun).getTime()) / 1000 / 60;

        switch (interval) {
          case "1m":
            return minutesSinceLastRun >= 1;
          case "15m":
            return minutesSinceLastRun >= 15;
          case "30m":
            return minutesSinceLastRun >= 30;
          case "1h":
            return minutesSinceLastRun >= 60;
          case "6h":
            return minutesSinceLastRun >= 360;
          case "12h":
            return minutesSinceLastRun >= 720;
          case "1d":
            return minutesSinceLastRun >= 1440;
          default:
            return false;
        }
      });
    });

    if (dueWorkflows.length === 0) {
      return { message: "No workflows due" };
    }

    const events = dueWorkflows.map((workflow) => ({
      name: "workflow/execute-workflow",
      data: {
        workflowId: workflow.id,
        initialData: {
          trigger: "schedule",
          timestamp: new Date().toISOString(),
        },
      },
    }));

    await step.sendEvent("trigger-due-workflows", events);

    return { triggered: dueWorkflows.length };
  }
);
