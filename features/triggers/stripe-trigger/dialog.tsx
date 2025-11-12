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
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StripeTriggerDialog = ({ open, onOpenChange }: Props) => {
  const params = useParams();
  const workflowId = params.workflowId as string;

  const [signingSecret, setSigningSecret] = useState<string>("");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/webhooks/stripe?workflowId=${workflowId}`;

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
          <DialogTitle>Stripe Trigger</DialogTitle>
          <DialogDescription>
            Connect Stripe to this workflow. Automatically process payment
            events from your Stripe account.
          </DialogDescription>
        </DialogHeader>

        {/* Quick Setup Guide */}
        <div className="rounded-md bg-blue-50 p-3 text-sm">
          <p className="text-blue-600 font-medium">Quick Setup Guide:</p>
          <ul className="mt-1 space-y-1 text-blue-600 text-xs list-disc pl-4">
            <li>Copy the webhook URL below</li>
            <li>Add it as an endpoint in your Stripe Dashboard</li>
            <li>Select the events you want to listen for and save</li>
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
              This unique URL will receive event notifications from Stripe for
              the selected events.
            </p>
          </div>

          {/* Setup Instructions */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Setup Instructions</h4>
            <div className="rounded-lg border bg-card p-3">
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside marker:text-primary marker:font-medium">
                <li>Open your Stripe Dashboard</li>
                <li>Go to Developers → Webhooks</li>
                <li>Click "Add endpoint"</li>
                <li>
                  Paste the
                  <code className="text-xs bg-muted px-1 rounded">
                    WEBHOOK_URL
                  </code>{" "}
                  from above as the endpoint URL
                </li>
                <li>
                  Select the events to listen for (e.g.,{" "}
                  <code>payment_intent.succeeded</code>,{" "}
                  <code>invoice.paid</code>)
                </li>
                <li>
                  Save the endpoint and copy the signing secret (used to verify
                  events)
                </li>
              </ol>
            </div>
          </div>

          {/* Signing secret input */}
          {/* <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="signing-secret" className="text-sm font-medium">
                Signing Secret
              </Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(signingSecret || "");
                      toast.success("Signing secret copied to clipboard");
                    } catch {
                      toast.error("Failed to copy signing secret. Try again");
                    }
                  }}
                  className="h-8 px-2"
                >
                  <CopyIcon className="size-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
            <Input
              id="signing-secret"
              value={signingSecret}
              onChange={(e) => setSigningSecret(e.target.value)}
              placeholder="Paste your Stripe signing secret here"
              className="font-mono text-sm bg-muted/50"
            />
            <p className="text-xs text-muted-foreground">
              Paste the signing secret you copied from the Stripe endpoint here.
              This is useful for locally testing signature verification or
              saving it to your workflow configuration.
            </p>
          </div> */}

          {/* Available Response Data */}
          {/* Available Response Data */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Available Response Data</h4>
            <p className="text-xs text-muted-foreground">
              You can reference these variables in your workflow actions to use
              specific response data from Stripe
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
                    {"{{stripe.amount}}"}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    Payment amount
                  </span>
                </div>

                <div className="grid grid-cols-2 items-start gap-3 px-3 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono break-all text-foreground">
                    {"{{stripe.currency}}"}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    Currency code
                  </span>
                </div>

                <div className="grid grid-cols-2 items-start gap-3 px-3 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono break-all text-foreground">
                    {"{{stripe.customerId}}"}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    Customer ID
                  </span>
                </div>

                <div className="grid grid-cols-2 items-start gap-3 px-3 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono break-all text-foreground">
                    {"{{json stripe}}"}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    Complete event data as JSON
                  </span>
                </div>

                <div className="grid grid-cols-2 items-start gap-3 px-3 py-2">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono break-all text-foreground">
                    {"{{stripe.eventType}}"}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    Event type
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
