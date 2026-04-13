import { motion } from "framer-motion";
import { visualSignals } from "@/data/mockData";
import { Eye, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const scores = [
  { label: "Image Similarity", value: "34%", severity: "critical" },
  { label: "Counterfeit Risk", value: "72%", severity: "high" },
  { label: "Same Item Likelihood", value: "18%", severity: "critical" },
];

const severityIcon = { high: AlertTriangle, medium: Info, low: CheckCircle2 };
const severityColor = {
  high: "border-critical/30 bg-critical/5",
  medium: "border-warning/30 bg-warning/5",
  low: "border-success/30 bg-success/5",
};

export default function VisualAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Visual Analysis</h1>
        <p className="text-sm text-muted-foreground mt-1">CASE-2024-0847 · Chanel Classic Flap Bag</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Original Listing</p>
          <div className="aspect-square rounded-lg bg-muted/30 border border-border/30 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Eye className="h-8 w-8 text-primary mx-auto opacity-50" />
              <p className="text-xs text-muted-foreground">Original product image</p>
              <p className="text-xs text-primary">920g · All accessories included</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Returned Item</p>
          <div className="aspect-square rounded-lg bg-muted/30 border border-critical/20 flex items-center justify-center">
            <div className="text-center space-y-2">
              <AlertTriangle className="h-8 w-8 text-critical mx-auto opacity-50" />
              <p className="text-xs text-muted-foreground">Returned product image</p>
              <p className="text-xs text-critical">680g · Missing accessories</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scores.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
            className="glass-card p-5 text-center"
          >
            <p className="text-xs text-muted-foreground mb-2">{s.label}</p>
            <p className={cn("text-3xl font-display font-bold", s.severity === "critical" ? "text-critical" : "text-warning")}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Signal Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {visualSignals.map((signal, i) => {
            const Icon = severityIcon[signal.severity];
            return (
              <motion.div key={signal.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                className={cn("glass-card p-4 border", severityColor[signal.severity])}
              >
                <div className="flex items-start gap-3">
                  <Icon className={cn("h-4 w-4 mt-0.5 shrink-0",
                    signal.severity === "high" ? "text-critical" : signal.severity === "medium" ? "text-warning" : "text-success"
                  )} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{signal.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{signal.detail}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
