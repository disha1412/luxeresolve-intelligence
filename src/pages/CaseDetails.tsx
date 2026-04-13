import { useParams, useNavigate } from "react-router-dom";
import { cases, pipelineStages, timelineEvents } from "@/data/mockData";
import { RiskBadge, StatusBadge } from "@/components/shared/RiskBadge";
import { AgentPipeline } from "@/components/shared/AgentPipeline";
import { ArrowLeft, User, Store, Clock, Bot } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function CaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const caseData = cases.find((c) => c.id === id) || cases[0];

  return (
    <div className="space-y-6">
      <button onClick={() => navigate("/cases")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Queue
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-display font-bold text-foreground">{caseData.caseNumber}</h1>
              <StatusBadge status={caseData.status} />
              <RiskBadge score={caseData.riskScore} size="sm" />
            </div>
            <p className="text-foreground">{caseData.brand} · {caseData.item}</p>
            <p className="text-2xl font-display font-bold text-primary mt-1">${caseData.price.toLocaleString()}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Assigned to <span className="text-foreground">{caseData.assignee}</span></p>
            <p>Opened {new Date(caseData.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-border/30">
          <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Agent Pipeline</p>
          <AgentPipeline stages={pipelineStages} />
        </div>
      </motion.div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="bg-muted/50 border border-border/50">
          <TabsTrigger value="summary" className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Summary</TabsTrigger>
          <TabsTrigger value="evidence" className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Evidence</TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-primary/15 data-[state=active]:text-primary">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium text-foreground">Buyer Profile</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="text-foreground">{caseData.buyer.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Member since</span><span className="text-foreground">{new Date(caseData.buyer.joinDate).toLocaleDateString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total orders</span><span className="text-foreground">{caseData.buyer.totalOrders}</span></div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Return rate</span>
                  <span className={caseData.buyer.returnRate > 20 ? "text-critical" : "text-foreground"}>{caseData.buyer.returnRate}%</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Store className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium text-foreground">Seller Profile</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="text-foreground">{caseData.seller.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Rating</span><span className="text-primary">{caseData.seller.rating} ★</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total sales</span><span className="text-foreground">{caseData.seller.totalSales.toLocaleString()}</span></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-medium text-foreground">AI Summary</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                High-confidence return fraud detected. The returned item shows significant weight discrepancy (−240g), missing accessories (chain strap, dust bag), and only 34% visual similarity to the original listing. Buyer has a 42% return rate with 5 luxury returns in 6 months — well above the 8% marketplace average. Recommend denying refund and escalating for further review.
              </p>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="evidence">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseData.flags.map((flag, i) => (
              <motion.div key={flag} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-critical/10 flex items-center justify-center">
                    <span className="text-critical text-lg">!</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{flag}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Flagged by AI analysis pipeline</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-5">
            <div className="space-y-0">
              {timelineEvents.map((event, i) => (
                <div key={i} className="flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1.5" />
                    {i < timelineEvents.length - 1 && <div className="w-px flex-1 bg-border/50 mt-1" />}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm text-foreground">{event.event}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                      <span className="text-xs text-primary">· {event.agent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
