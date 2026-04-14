import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  index?: number;
}

export function MetricCard({ title, value, change, changeType = "neutral", icon: Icon, index = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass-card p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-display font-bold tracking-tight text-foreground">{value}</p>
          {change && (
            <p className={cn("text-xs font-medium", changeType === "positive" ? "text-success" : changeType === "negative" ? "text-critical" : "text-muted-foreground")}>
              {change}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/15 transition-colors">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </motion.div>
  );
}
