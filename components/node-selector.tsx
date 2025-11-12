"use client";

import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";
import {
  GlobeIcon,
  MousePointerClickIcon,
  DatabaseIcon,
  ClockIcon,
} from "lucide-react";
import React, { useCallback } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NodeType } from "@/lib/generated/prisma/enums";
import { Separator } from "./ui/separator";

// Define the Node type and interface
export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

// 🧩 Category-based configuration — easy to extend
const NODE_CATEGORIES: {
  title: string;
  description?: string;
  nodes: NodeTypeOption[];
}[] = [
  {
    title: "Triggers",
    description: "Start your workflow when something happens",
    nodes: [
      {
        type: NodeType.MANUAL_TRIGGER,
        label: "Manual Trigger",
        description: "Run the flow manually with a button click",
        icon: MousePointerClickIcon,
      },
      {
        type: NodeType.GOOGLE_FORM_TRIGGER,
        label: "Google Form Submission",
        description: "Trigger workflow when someone submits a Google Form",
        icon: ({ className }) => (
          <img src="/googleform.svg" alt="Google Form" className={className} />
        ),
      },
      {
        type: NodeType.STRIPE_TRIGGER,
        label: "Stripe",
        description: "Trigger workflow when stripe event is captured",
        icon: ({ className }) => (
          <img src="/stripe.svg" alt="Stripe" className={className} />
        ),
      },
    ],
  },
  {
    title: "Actions",
    description: "Perform tasks or interact with APIs",
    nodes: [
      {
        type: NodeType.HTTP_REQUEST,
        label: "HTTP Request",
        description: "Make an HTTP request to another service",
        icon: GlobeIcon,
      },
      // {
      //   type: NodeType.DATABASE_WRITE,
      //   label: "Database Write",
      //   description: "Insert or update records in your database",
      //   icon: DatabaseIcon,
      // },
    ],
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function NodeSelector({
  children,
  onOpenChange,
  open,
}: NodeSelectorProps) {
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeSelect = useCallback(
    (selection: NodeTypeOption) => {
      if (selection.type === NodeType.MANUAL_TRIGGER) {
        const nodes = getNodes();
        const hasManualTrigger = nodes.some(
          (node) => node.type === NodeType.MANUAL_TRIGGER
        );

        if (hasManualTrigger) {
          toast.error("Only one manual trigger is allowed per workflow");
          return;
        }
      }

      setNodes((nodes) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const flowPosition = screenToFlowPosition({
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 200,
        });

        const newNode = {
          id: createId(),
          data: {},
          position: flowPosition,
          type: selection.type,
        };

        return [...nodes, newNode];
      });

      onOpenChange(false);
    },
    [setNodes, getNodes, onOpenChange, screenToFlowPosition]
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto bg-[#fafafa] dark:bg-[#111] border-l border-border"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-lg font-semibold">
            Add a new step
          </SheetTitle>
          <SheetDescription>
            Choose a trigger or action to add to your workflow
          </SheetDescription>
        </SheetHeader>

        <div className="p-4 space-y-8">
          {NODE_CATEGORIES.map((category, index) => (
            <div key={category.title}>
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {category.title}
                </h3>
                {category.description && (
                  <p className="text-xs text-muted-foreground/80 mt-1">
                    {category.description}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                {category.nodes.map((nodeType) => {
                  const Icon = nodeType.icon;
                  return (
                    <div
                      key={nodeType.type}
                      onClick={() => handleNodeSelect(nodeType)}
                      className="group flex items-start gap-3 p-3 bg-card hover:bg-accent transition rounded-md border border-border cursor-pointer"
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-accent/40 group-hover:bg-primary/10">
                        <Icon className="size-5 text-muted-foreground group-hover:text-primary transition" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {nodeType.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {nodeType.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {index < NODE_CATEGORIES.length - 1 && (
                <Separator className="my-6" />
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
