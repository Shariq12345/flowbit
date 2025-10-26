import prisma from "@/lib/db";
import { inngest } from "./client";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const openai = createOpenAI();

export const executeAI = inngest.createFunction(
  { id: "execute" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("openai-generate-text", generateText, {
      model: openai("gpt-5-mini"),
      system:
        "You are a helpful assistant that generates text based on user prompts.",
      prompt: "What is 2 + 2?",
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    return steps;
  }
);
