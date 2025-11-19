import type { NodeExecutor } from "@/features/executions/types";
import { emailChannel } from "@/inngest/channels/email";
import { Resend } from "resend";
import prisma from "@/lib/db";
import { decrypt } from "@/lib/encryption";
import { NonRetriableError } from "inngest";

type EmailData = {
  to: string;
  subject: string;
  html: string;
  credentialId?: string;
};

export const emailExecutor: NodeExecutor<EmailData> = async ({
  nodeId,
  data,
  step,
  publish,
  userId,
}) => {
  await publish(
    emailChannel().status({
      nodeId,
      status: "loading",
    })
  );

  if (!data.credentialId) {
    await publish(
      emailChannel().status({
        nodeId,
        status: "failed",
      })
    );
    throw new NonRetriableError("Email node: Credential is missing");
  }

  const credential = await step.run("get-credential", () => {
    return prisma.credential.findUnique({
      where: {
        id: data.credentialId,
        userId: userId,
      },
    });
  });

  if (!credential) {
    await publish(
      emailChannel().status({
        nodeId,
        status: "failed",
      })
    );
    throw new NonRetriableError("Email node: Credential not found");
  }

  const resend = new Resend(decrypt(credential.value));

  const result = await step.run("send-email", async () => {
    const { data: emailData, error } = await resend.emails.send({
      from: "Flowbit <onboarding@resend.dev>", // Default testing domain
      to: [data.to],
      subject: data.subject,
      html: data.html,
    });

    if (error) {
      throw new Error(error.message);
    }

    return emailData;
  });

  await publish(
    emailChannel().status({
      nodeId,
      status: "success",
    })
  );

  return result;
};
