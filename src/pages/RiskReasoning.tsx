import { motion } from "framer-motion";
import { riskSignals } from "@/data/mockData";
import { Brain, User, Truck, Eye, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const severityColor: Record<string, string> = { high: "text-critical", medium: "text-warning", low: "text-success" };

function SignalPanel({ title, icon: Icon, signals }: { title: string; icon: React.ElementType; signals: { label: string; value: string; severity: string }[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
      </div>
      <div className="space-y-3">
        {signals.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn("h-1.5 w-1.5 rounded-full",
                s.severity === "high" ? "bg-critical" : s.severity === "medium" ? "bg-warning" : "bg-success"
              )} />
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
            <span className={cn("text-sm font-medium", severityColor[s.severity])}>{s.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function RiskReasoning() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Risk & Reasoning</h1>
        <p className="text-sm text-muted-foreground mt-1">CASE-2024-0847 · Chanel Classic Flap Bag</p>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-display font-semibold text-foreground">Risk Assessment</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-3xl font-display font-bold text-critical">86</p>
              <p className="text-xs text-critical">Critical Risk</p>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-critical/30 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-critical" />
            </div>
          </div>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: "86%" }} transition={{ duration: 1, delay: 0.3 }} className="h-full rounded-full bg-gradient-to-r from-warning to-critical" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Confidence: 94% · Based on 12 signals across 3 categories</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SignalPanel title="Behavioral Signals" icon={User} signals={riskSignals.behavioral} />
        <SignalPanel title="Logistics Signals" icon={Truck} signals={riskSignals.logistics} />
        <SignalPanel title="Visual Signals" icon={Eye} signals={riskSignals.visual} />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">AI Explanation</h3>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <p className="text-sm text-foreground/80 leading-relaxed">
            This case exhibits <span className="text-critical font-medium">strong indicators of return fraud</span>. The returned item weighs 240g less than the original shipment (680g vs 920g), suggesting key components are missing. Visual analysis confirms the absence of the chain strap and branded dust bag, with only 34% image similarity between the original and returned item.
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed mt-3">
            The buyer's behavioral pattern raises additional concerns: a <span className="text-critical font-medium">42% return rate</span> (5× the marketplace average) with 5 high-value luxury returns in the past 6 months. The return was initiated just 2 days after delivery, shipped from a different city than the delivery address.
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed mt-3">
            Combined with a 72% counterfeit probability score and 18% same-item likelihood, the evidence strongly suggests the buyer is returning a different, lower-value item. <span className="text-primary font-medium">Recommended action: Deny refund</span> and flag the buyer account for enhanced monitoring.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
