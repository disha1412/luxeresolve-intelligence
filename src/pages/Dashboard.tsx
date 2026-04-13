import { AlertTriangle, Clock, CheckCircle2, DollarSign } from "lucide-react";
import { MetricCard } from "@/components/shared/MetricCard";
import { RiskBadge, StatusBadge } from "@/components/shared/RiskBadge";
import { cases, disputesByType, riskDistribution, refundTrend } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const metrics = [
  { title: "Open Disputes", value: 28, change: "+12% from last month", changeType: "negative" as const, icon: AlertTriangle },
  { title: "High Risk Cases", value: 14, change: "+3 this week", changeType: "negative" as const, icon: Clock },
  { title: "Pending Approvals", value: 6, change: "2 urgent", changeType: "neutral" as const, icon: CheckCircle2 },
  { title: "Refund Exposure", value: "$142K", change: "−8% from last month", changeType: "positive" as const, icon: DollarSign },
];

const chartTooltipStyle = {
  contentStyle: { background: "hsl(230, 12%, 8%)", border: "1px solid hsl(230, 10%, 16%)", borderRadius: "8px", fontSize: "12px" },
  labelStyle: { color: "hsl(220, 15%, 85%)" },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const highRiskCases = cases.filter((c) => c.riskScore >= 60).sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Dispute intelligence overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <MetricCard key={m.title} {...m} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Disputes by Type</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={disputesByType} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} strokeWidth={0}>
                {disputesByType.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip {...chartTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {disputesByType.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: d.fill }} />
                {d.name}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={riskDistribution}>
              <XAxis dataKey="range" tick={{ fill: "hsl(220,10%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(220,10%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {riskDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="glass-card p-5">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Refund Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={refundTrend}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(42,50%,57%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(42,50%,57%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "hsl(220,10%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(220,10%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip {...chartTooltipStyle} />
              <Area type="monotone" dataKey="amount" stroke="hsl(42,50%,57%)" fill="url(#goldGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h3 className="text-sm font-medium text-foreground">High-Risk Cases</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Case</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Item</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Value</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Risk</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Assignee</th>
              </tr>
            </thead>
            <tbody>
              {highRiskCases.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/cases/${c.id}`)}
                  className="border-b border-border/20 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3.5 text-sm font-medium text-foreground">{c.caseNumber}</td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm text-foreground">{c.brand}</div>
                    <div className="text-xs text-muted-foreground">{c.item}</div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground">${c.price.toLocaleString()}</td>
                  <td className="px-5 py-3.5"><RiskBadge score={c.riskScore} size="sm" /></td>
                  <td className="px-5 py-3.5"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{c.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
