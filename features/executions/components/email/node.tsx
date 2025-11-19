import { memo, useState } from "react";
import { NodeProps } from "@xyflow/react";
import { BaseExecutionNode } from "@/components/base-execution-node";
import { MailIcon } from "lucide-react";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { EmailDialog } from "./dialog";
import { EMAIL_CHANNEL_NAME } from "@/inngest/channels/email";
import { fetchEmailRealtimeToken } from "./actions";

export const EmailNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: EMAIL_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchEmailRealtimeToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  const to = (props.data.to as string) || "";
  const subject = (props.data.subject as string) || "";
  const html = (props.data.html as string) || "";
  const credentialId = (props.data.credentialId as string) || undefined;

  return (
    <>
      <EmailDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        nodeId={props.id}
        initialTo={to}
        initialSubject={subject}
        initialHtml={html}
        initialCredentialId={credentialId}
      />
      <BaseExecutionNode
        {...props}
        icon={MailIcon}
        name="Send Email"
        description={to ? `To: ${to}` : "Configure email"}
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});
