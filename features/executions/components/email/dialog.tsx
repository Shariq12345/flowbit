import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { useCredentialsByType } from "@/features/credentials/hooks/use-credentials";
import { CredentialType } from "@/lib/generated/prisma/enums";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { MailIcon } from "lucide-react";

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodeId: string;
  initialTo: string;
  initialSubject: string;
  initialHtml: string;
  initialCredentialId?: string;
}

export const EmailDialog = ({
  open,
  onOpenChange,
  nodeId,
  initialTo,
  initialSubject,
  initialHtml,
  initialCredentialId,
}: EmailDialogProps) => {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [html, setHtml] = useState(initialHtml);
  const [credentialId, setCredentialId] = useState(initialCredentialId);
  const { setNodes } = useReactFlow();

  const { data: credentials, isLoading: isLoadingCredentials } =
    useCredentialsByType(CredentialType.RESEND);

  const handleSave = () => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              to,
              subject,
              html,
              credentialId,
            },
          };
        }
        return node;
      })
    );
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Email Configuration</DialogTitle>
          <DialogDescription>Send an email using Resend.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="credential">Resend Credential</Label>
            <Select
              value={credentialId}
              onValueChange={setCredentialId}
              disabled={isLoadingCredentials || !credentials?.length}
            >
              <SelectTrigger id="credential">
                <SelectValue placeholder="Select a credential" />
              </SelectTrigger>
              <SelectContent>
                {credentials?.map((credential) => (
                  <SelectItem key={credential.id} value={credential.id}>
                    <div className="flex items-center gap-2">
                      <MailIcon className="size-4 text-muted-foreground" />
                      {credential.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Hello from Flowbit"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="html">Body (HTML)</Label>
            <Textarea
              id="html"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder="<p>Your message here</p>"
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
