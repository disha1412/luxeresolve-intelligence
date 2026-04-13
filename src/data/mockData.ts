export interface Case {
  id: string;
  caseNumber: string;
  brand: string;
  item: string;
  price: number;
  riskScore: number;
  status: "open" | "investigating" | "pending_approval" | "resolved" | "escalated";
  type: "return_fraud" | "authenticity" | "shipping_tampering" | "chargeback" | "missing_item";
  buyer: { name: string; email: string; joinDate: string; totalOrders: number; returnRate: number };
  seller: { name: string; email: string; rating: number; totalSales: number };
  createdAt: string;
  assignee: string;
  flags: string[];
}

export const heroCaseId = "CASE-2024-0847";

export const cases: Case[] = [
  {
    id: "1",
    caseNumber: "CASE-2024-0847",
    brand: "Chanel",
    item: "Classic Flap Bag - Medium Caviar",
    price: 8500,
    riskScore: 86,
    status: "investigating",
    type: "return_fraud",
    buyer: { name: "Elena Marchetti", email: "e.marchetti@email.com", joinDate: "2023-06-15", totalOrders: 12, returnRate: 42 },
    seller: { name: "LuxeVault Authenticated", email: "sales@luxevault.com", rating: 4.9, totalSales: 2340 },
    createdAt: "2024-03-15T10:30:00Z",
    assignee: "Sarah Chen",
    flags: ["Weight Mismatch", "Missing Accessories", "Low Image Similarity"],
  },
  {
    id: "2",
    caseNumber: "CASE-2024-0851",
    brand: "Hermès",
    item: "Birkin 25 Togo Leather",
    price: 14200,
    riskScore: 72,
    status: "open",
    type: "authenticity",
    buyer: { name: "James Richardson", email: "j.richardson@email.com", joinDate: "2024-01-10", totalOrders: 3, returnRate: 33 },
    seller: { name: "Heritage Luxe Co", email: "info@heritageluxe.com", rating: 4.7, totalSales: 890 },
    createdAt: "2024-03-14T08:15:00Z",
    assignee: "Marcus Lee",
    flags: ["Stamp Inconsistency", "New Account"],
  },
  {
    id: "3",
    caseNumber: "CASE-2024-0839",
    brand: "Louis Vuitton",
    item: "Neverfull MM Monogram",
    price: 2100,
    riskScore: 45,
    status: "pending_approval",
    type: "shipping_tampering",
    buyer: { name: "Sophia Bennett", email: "s.bennett@email.com", joinDate: "2022-11-20", totalOrders: 28, returnRate: 7 },
    seller: { name: "Preloved Prestige", email: "support@prelovedprestige.com", rating: 4.8, totalSales: 1560 },
    createdAt: "2024-03-13T14:45:00Z",
    assignee: "Sarah Chen",
    flags: ["Package Damage"],
  },
  {
    id: "4",
    caseNumber: "CASE-2024-0855",
    brand: "Rolex",
    item: "Submariner Date 126610LN",
    price: 12800,
    riskScore: 91,
    status: "escalated",
    type: "return_fraud",
    buyer: { name: "Viktor Petrov", email: "v.petrov@email.com", joinDate: "2024-02-28", totalOrders: 1, returnRate: 100 },
    seller: { name: "Chrono Certified", email: "auth@chronocertified.com", rating: 4.95, totalSales: 4200 },
    createdAt: "2024-03-16T09:00:00Z",
    assignee: "Marcus Lee",
    flags: ["First Order Return", "Weight Mismatch", "Serial Mismatch"],
  },
  {
    id: "5",
    caseNumber: "CASE-2024-0842",
    brand: "Gucci",
    item: "GG Marmont Matelassé Mini",
    price: 1490,
    riskScore: 34,
    status: "resolved",
    type: "missing_item",
    buyer: { name: "Aisha Patel", email: "a.patel@email.com", joinDate: "2023-03-12", totalOrders: 19, returnRate: 10 },
    seller: { name: "Couture Exchange", email: "hello@coutureexchange.com", rating: 4.6, totalSales: 670 },
    createdAt: "2024-03-12T11:20:00Z",
    assignee: "Sarah Chen",
    flags: ["Dust Bag Missing"],
  },
  {
    id: "6",
    caseNumber: "CASE-2024-0860",
    brand: "Dior",
    item: "Lady Dior Medium",
    price: 5200,
    riskScore: 63,
    status: "open",
    type: "chargeback",
    buyer: { name: "Catherine Liu", email: "c.liu@email.com", joinDate: "2023-09-01", totalOrders: 8, returnRate: 25 },
    seller: { name: "LuxeVault Authenticated", email: "sales@luxevault.com", rating: 4.9, totalSales: 2340 },
    createdAt: "2024-03-16T15:30:00Z",
    assignee: "Marcus Lee",
    flags: ["Chargeback Filed", "Item Received"],
  },
];

export const disputesByType = [
  { name: "Return Fraud", value: 38, fill: "hsl(42, 50%, 57%)" },
  { name: "Authenticity", value: 24, fill: "hsl(217, 91%, 60%)" },
  { name: "Shipping", value: 15, fill: "hsl(142, 71%, 45%)" },
  { name: "Chargeback", value: 13, fill: "hsl(0, 72%, 51%)" },
  { name: "Missing Item", value: 10, fill: "hsl(280, 65%, 60%)" },
];

export const riskDistribution = [
  { range: "0-25", count: 12, fill: "hsl(142, 71%, 45%)" },
  { range: "26-50", count: 18, fill: "hsl(217, 91%, 60%)" },
  { range: "51-75", count: 24, fill: "hsl(38, 92%, 50%)" },
  { range: "76-100", count: 14, fill: "hsl(0, 72%, 51%)" },
];

export const refundTrend = [
  { month: "Oct", amount: 42000, disputes: 18 },
  { month: "Nov", amount: 38000, disputes: 15 },
  { month: "Dec", amount: 67000, disputes: 32 },
  { month: "Jan", amount: 54000, disputes: 24 },
  { month: "Feb", amount: 49000, disputes: 21 },
  { month: "Mar", amount: 58000, disputes: 28 },
];

export const pipelineStages = [
  { id: "intake", label: "Intake", status: "complete" as const },
  { id: "evidence", label: "Evidence", status: "complete" as const },
  { id: "visual", label: "Visual Analysis", status: "complete" as const },
  { id: "risk", label: "Risk Scoring", status: "active" as const },
  { id: "policy", label: "Policy Check", status: "pending" as const },
  { id: "resolution", label: "Resolution", status: "pending" as const },
];

export const timelineEvents = [
  { time: "Mar 15, 10:30 AM", event: "Case opened — return request received", agent: "System" },
  { time: "Mar 15, 10:31 AM", event: "Intake agent collected shipment & order data", agent: "Intake Agent" },
  { time: "Mar 15, 10:32 AM", event: "Evidence agent flagged weight mismatch (returned: 680g vs original: 920g)", agent: "Evidence Agent" },
  { time: "Mar 15, 10:33 AM", event: "Visual analysis: image similarity 34%, missing chain strap & dust bag", agent: "Visual Agent" },
  { time: "Mar 15, 10:34 AM", event: "Risk score calculated: 86 (Critical) — 3 high-severity signals", agent: "Risk Agent" },
  { time: "Mar 15, 10:35 AM", event: "Awaiting policy check and human approval", agent: "System" },
];

export const visualSignals = [
  { label: "Missing Chain Strap", severity: "high" as const, detail: "Original listing shows removable chain strap; return package missing this accessory" },
  { label: "Logo Stamp Mismatch", severity: "high" as const, detail: "Font kerning differs by 12% from authenticated reference" },
  { label: "Dust Bag Absent", severity: "medium" as const, detail: "Original shipment included branded dust bag, not present in return" },
  { label: "Stitching Pattern", severity: "low" as const, detail: "Stitch count per inch within acceptable range (11 vs 12)" },
];

export const riskSignals = {
  behavioral: [
    { label: "High return rate", value: "42% (avg: 8%)", severity: "high" as const },
    { label: "Account age at purchase", value: "9 months", severity: "low" as const },
    { label: "Multiple luxury returns", value: "5 in 6 months", severity: "high" as const },
  ],
  logistics: [
    { label: "Weight discrepancy", value: "−240g (26% lighter)", severity: "high" as const },
    { label: "Return shipped from", value: "Different city than delivery", severity: "medium" as const },
    { label: "Time to return", value: "2 days after delivery", severity: "medium" as const },
  ],
  visual: [
    { label: "Image similarity", value: "34%", severity: "high" as const },
    { label: "Counterfeit probability", value: "72%", severity: "high" as const },
    { label: "Same item likelihood", value: "18%", severity: "high" as const },
  ],
};
