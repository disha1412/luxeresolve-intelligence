import { useState } from "react";
import { motion } from "framer-motion";
import { Gavel, CheckCircle2, AlertTriangle, ArrowUpRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ActionsApprovals() {
  const [actionTaken, setActionTaken] = useState(false);
  const [notes, setNotes] = useState("");

  const handleAction = (action: string) => {
    setActionTaken(true);
    toast.success(`Action taken: ${action}`, { description: "Case CASE-2024-0847 has been updated." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Actions & Approvals</h1>
        <p className="text-sm text-muted-foreground mt-1">CASE-2024-0847 · Chanel Classic Flap Bag</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <Gavel className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-display font-semibold text-foreground">Recommended Action</h2>
        </div>
        <div className="bg-critical/5 border border-critical/20 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-critical/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5 text-critical" />
            </div>
            <div>
              <p className="text-foreground font-semibold">Deny Refund</p>
              <p className="text-sm text-muted-foreground mt-0.5">Based on 86/100 risk score with 94% confidence. Return fraud pattern detected with weight mismatch, missing accessories, and low image similarity.</p>
            </div>
          </div>
        </div>

        {!actionTaken ? (
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => handleAction("Approve Recommendation")} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
            </Button>
            <Button onClick={() => handleAction("Override — Approve Refund")} variant="outline" className="border-border/50 text-foreground hover:bg-muted">
              Override — Approve Refund
            </Button>
            <Button onClick={() => handleAction("Escalate to Senior Review")} variant="outline" className="border-warning/30 text-warning hover:bg-warning/10">
              <ArrowUpRight className="mr-2 h-4 w-4" /> Escalate
            </Button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <p className="text-sm font-medium text-success">Action recorded successfully</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Notes</h3>
        </div>
        <Textarea
          placeholder="Add investigation notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="bg-muted/30 border-border/50 focus:border-primary/50 min-h-[100px] text-foreground"
        />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-5">
        <h3 className="text-sm font-medium text-foreground mb-4">Workflow Status</h3>
        <div className="space-y-3">
          {[
            { step: "Return request received", status: "complete", time: "Mar 15, 10:30 AM" },
            { step: "AI analysis completed", status: "complete", time: "Mar 15, 10:35 AM" },
            { step: "Recommendation generated", status: "complete", time: "Mar 15, 10:35 AM" },
            { step: "Human review", status: actionTaken ? "complete" : "active", time: actionTaken ? "Just now" : "Awaiting" },
            { step: "Buyer notification", status: actionTaken ? "active" : "pending", time: "Pending" },
            { step: "Case closure", status: "pending", time: "Pending" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={cn("h-2 w-2 rounded-full",
                s.status === "complete" ? "bg-success" : s.status === "active" ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
              )} />
              <span className={cn("text-sm flex-1", s.status === "pending" ? "text-muted-foreground" : "text-foreground")}>{s.step}</span>
              <span className="text-xs text-muted-foreground">{s.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
