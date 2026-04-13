import { Check, Loader2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stage {
  id: string;
  label: string;
  status: "complete" | "active" | "pending";
}

export function AgentPipeline({ stages }: { stages: Stage[] }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {stages.map((stage, i) => (
        <div key={stage.id} className="flex items-center">
          <div className={cn(
            "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all border",
            stage.status === "complete" && "bg-success/10 text-success border-success/30",
            stage.status === "active" && "bg-primary/15 text-primary border-primary/40 animate-pulse-gold",
            stage.status === "pending" && "bg-muted text-muted-foreground border-border"
          )}>
            {stage.status === "complete" && <Check className="h-3 w-3" />}
            {stage.status === "active" && <Loader2 className="h-3 w-3 animate-spin" />}
            {stage.status === "pending" && <Circle className="h-3 w-3" />}
            <span className="whitespace-nowrap">{stage.label}</span>
          </div>
          {i < stages.length - 1 && (
            <div className={cn("w-6 h-px mx-1", stage.status === "complete" ? "bg-success/40" : "bg-border")} />
          )}
        </div>
      ))}
    </div>
  );
}
