"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualTriggerDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Trigger</DialogTitle>
          <DialogDescription>
            A manual trigger lets you start your workflow on-demand with a
            single click
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">How it works</h4>
              <p className="text-sm text-muted-foreground">
                When you add this trigger to your workflow, it creates a unique
                endpoint that you can activate manually. Perfect for testing
                workflows or triggering processes on-demand.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Usage</h4>
              <p className="text-sm text-muted-foreground">
                • Click the "Run" button on the node to trigger the workflow
                manually
                <br />
                • Use it during development to test your workflow
                <br />• Trigger specific workflow runs without waiting for other
                events
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
