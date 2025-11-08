import { Button } from "@/components/ui/button";
import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows";
import { PlayIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const ExecuteWorkflowButton = ({
  workflowId,
}: {
  workflowId: string;
}) => {
  const executeWorkflow = useExecuteWorkflow();

  const handleExecute = () => {
    executeWorkflow.mutate({ id: workflowId });
  };

  return (
    <Button
      size="lg"
      onClick={handleExecute}
      disabled={executeWorkflow.isPending}
      className={cn(
        "flex items-center gap-2 font-medium px-5",
        "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
        "transition-colors duration-200",
        "disabled:opacity-60 disabled:cursor-not-allowed"
      )}
    >
      {executeWorkflow.isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <PlayIcon className="h-4 w-4" />
      )}
      {executeWorkflow.isPending ? "Running..." : "Run Workflow"}
    </Button>
  );
};
