import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cases } from "@/data/mockData";
import { RiskBadge, StatusBadge } from "@/components/shared/RiskBadge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const filterChips = [
  { label: "All", value: "all" },
  { label: "High Risk", value: "high_risk" },
  { label: "Return Fraud", value: "return_fraud" },
  { label: "Needs Approval", value: "pending_approval" },
  { label: "Escalated", value: "escalated" },
];

export default function CaseQueue() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = cases.filter((c) => {
    const matchSearch = !search || c.caseNumber.toLowerCase().includes(search.toLowerCase()) ||
      c.brand.toLowerCase().includes(search.toLowerCase()) || c.item.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (activeFilter === "all") return true;
    if (activeFilter === "high_risk") return c.riskScore >= 70;
    if (activeFilter === "return_fraud") return c.type === "return_fraud";
    if (activeFilter === "pending_approval") return c.status === "pending_approval";
    if (activeFilter === "escalated") return c.status === "escalated";
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Case Queue</h1>
        <p className="text-sm text-muted-foreground mt-1">{cases.length} total cases</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by case, brand, or item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-muted/50 border-border/50 focus:border-primary/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filterChips.map((chip) => (
            <button
              key={chip.value}
              onClick={() => setActiveFilter(chip.value)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                activeFilter === chip.value
                  ? "bg-primary/15 text-primary border-primary/30"
                  : "bg-muted/50 text-muted-foreground border-border/50 hover:border-primary/20"
              )}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                {["Case", "Brand / Item", "Value", "Type", "Risk", "Status", "Assignee", "Flags"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-muted-foreground px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(`/cases/${c.id}`)}
                  className="border-b border-border/20 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3.5 text-sm font-medium text-foreground">{c.caseNumber}</td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm text-foreground">{c.brand}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">{c.item}</div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground">${c.price.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-xs text-muted-foreground capitalize">{c.type.replace(/_/g, " ")}</td>
                  <td className="px-5 py-3.5"><RiskBadge score={c.riskScore} size="sm" /></td>
                  <td className="px-5 py-3.5"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{c.assignee}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1 flex-wrap">
                      {c.flags.slice(0, 2).map((f) => (
                        <span key={f} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{f}</span>
                      ))}
                      {c.flags.length > 2 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">+{c.flags.length - 2}</span>}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
