import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import CaseQueue from "@/pages/CaseQueue";
import CaseDetails from "@/pages/CaseDetails";
import VisualAnalysis from "@/pages/VisualAnalysis";
import RiskReasoning from "@/pages/RiskReasoning";
import ActionsApprovals from "@/pages/ActionsApprovals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cases" element={<CaseQueue />} />
            <Route path="/cases/:id" element={<CaseDetails />} />
            <Route path="/cases/:id/visual" element={<VisualAnalysis />} />
            <Route path="/cases/:id/risk" element={<RiskReasoning />} />
            <Route path="/cases/:id/actions" element={<ActionsApprovals />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
