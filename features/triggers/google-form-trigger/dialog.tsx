"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { generateGoogleFormScript } from "./utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GoogleFormTriggerDialog = ({ open, onOpenChange }: Props) => {
  const params = useParams();
  const workflowId = params.workflowId as string;

  // ✅ Fixed typo in fallback URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/webhooks/google-form?workflowId=${workflowId}`;

  const copyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${message} copied to clipboard`);
    } catch {
      toast.error(`Failed to copy ${message.toLowerCase()}. Try again`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Google Form Trigger</DialogTitle>
          <DialogDescription>
            Connect your Google Form to this workflow. Automatically process
            form submissions and take actions based on responses.
          </DialogDescription>
        </DialogHeader>

        {/* Quick Setup Guide */}
        <div className="rounded-md bg-blue-50 p-3 text-sm">
          <p className="text-blue-600 font-medium">Quick Setup Guide:</p>
          <ul className="mt-1 space-y-1 text-blue-600 text-xs list-disc pl-4">
            <li>Copy the webhook URL and script provided below</li>
            <li>Add them to your Google Form's Script Editor</li>
            <li>Set up a form submission trigger</li>
          </ul>
        </div>

        <div className="mt-4 space-y-6">
          {/* Webhook URL Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="webhook-url" className="text-sm font-medium">
                Webhook URL
              </Label>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(webhookUrl, "Webhook URL")}
                className="h-8 px-2"
              >
                <CopyIcon className="size-4 mr-2" />
                Copy URL
              </Button>
            </div>
            <Input
              id="webhook-url"
              value={webhookUrl}
              readOnly
              className="font-mono text-sm bg-muted/50"
            />
            <p className="text-xs text-muted-foreground">
              This unique URL will receive form submission data from your Google
              Form.
            </p>
          </div>

          {/* Setup Instructions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Setup Instructions</h4>
            <div className="rounded-lg border bg-card p-3">
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside marker:text-primary marker:font-medium">
                <li>Open your Google Form in a browser</li>
                <li>Click the three dots menu (⋮) → Select "Apps Script"</li>
                <li>Copy the script below and paste it into the editor</li>
                <li>
                  Replace{" "}
                  <code className="text-xs bg-muted px-1 rounded">
                    WEBHOOK_URL
                  </code>{" "}
                  with the URL above
                </li>
                <li>Click "Save" then select "Triggers" in the sidebar</li>
                <li>Create trigger: From form → On form submit → Save</li>
              </ol>
            </div>
          </div>

          {/* Google Apps Script Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Google Apps Script</h4>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() =>
                  copyToClipboard(
                    generateGoogleFormScript(webhookUrl),
                    "Script"
                  )
                }
                className="h-8 px-2"
              >
                <CopyIcon className="size-4 mr-2" />
                Copy Script
              </Button>
            </div>

            {/* Optional: Display the generated script preview */}
            <div className="rounded-lg border bg-card/50 p-3">
              <pre className="text-xs font-mono whitespace-pre-wrap break-all text-muted-foreground">
                {generateGoogleFormScript(webhookUrl)}
              </pre>
            </div>

            <p className="text-xs text-muted-foreground">
              This script automatically formats and sends form responses to your
              workflow.
            </p>
          </div>

          {/* Available Response Data */}
          {/* Available Response Data */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Available Response Data</h4>
            <p className="text-xs text-muted-foreground">
              You can reference these variables in your workflow actions to use
              specific response data from the Google Form submission.
            </p>

            <div className="rounded-lg border bg-card divide-y divide-border">
              {/* Header row */}
              <div className="grid grid-cols-2 text-xs font-medium text-muted-foreground uppercase bg-muted/40 px-3 py-2 rounded-t-lg">
                <span>Variable</span>
                <span>Description</span>
              </div>

              {/* Variables list */}
              <div className="divide-y divide-border text-sm">
                <div className="grid grid-cols-2 items-start gap-3 px-3 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono break-all text-foreground">
                    {"{{googleForm.respondentEmail}}"}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    Respondent&apos;s email address
                  </span>
                </div>

                <div className="grid grid-cols-2 items-start gap-3 px-3 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono break-all text-foreground">
                    {"{{googleForm.response['Question Title']}}"}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    Answer to a specific question
                  </span>
                </div>

                <div className="grid grid-cols-2 items-start gap-3 px-3 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono break-all text-foreground">
                    {"{{googleForm.responses}}"}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    Complete response data as JSON
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
