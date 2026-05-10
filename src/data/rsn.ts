/**
 * RSN Club — Institutional dummy data
 * All values are demo data designed to feel operationally credible.
 */

export type MemberTier = "Founding" | "Platinum" | "Gold" | "Standard";
export type MemberStatus = "Active" | "Pending Review" | "Renewal Due" | "Suspended";
export type ShipmentStatus = "Dispatched" | "In Transit" | "At Customs" | "Cleared" | "Delivered" | "On Hold";
export type OrderStatus = "Confirmed" | "Allocated" | "Dispatched" | "Delivered" | "Reconciled";

export interface Member {
  id: string;
  name: string;
  city: string;
  tier: MemberTier;
  type: "Retailer" | "TikTok Seller" | "Daraz Seller" | "Bulk Buyer" | "Regional Wholesaler";
  status: MemberStatus;
  joinedDate: string;
  orderCount: number;
  totalSpend: number;
  accountOwner: string;
}

export interface Supplier {
  id: string;
  name: string;
  region: string;
  category: string;
  moq: number;
  leadTimeDays: number;
  rating: number;
  qualityScore: number;
  verified: boolean;
}

export interface Product {
  sku: string;
  name: string;
  category: string;
  moq: number;
  wholesalePrice: number;
  retailReference: number;
  margin: number;
  inventoryStatus: "In Stock" | "Allocating" | "On Order" | "Low Stock";
  sourceRegion: string;
  shippingClass: "Air" | "Sea" | "Cross-Border Express";
}

export interface Order {
  id: string;
  member: string;
  date: string;
  value: number;
  status: OrderStatus;
  fulfillment: string;
  eta: string;
  payment: "Wire" | "Credit Line" | "Escrow" | "Member Account";
}

export interface Shipment {
  id: string;
  route: string;
  status: ShipmentStatus;
  courier: string;
  dispatchDate: string;
  customsStage: string;
  expectedDelivery: string;
  landedCost: number;
}

export interface AIInsight {
  category: string;
  demandScore: number;
  growthPrediction: string;
  supplyRisk: "Low" | "Moderate" | "Elevated";
  recommendedAction: string;
  region: string;
  confidence: number;
}

export const members: Member[] = [
  { id: "M-2041", name: "Himalayan Retail Co.", city: "Kathmandu", tier: "Platinum", type: "Regional Wholesaler", status: "Active", joinedDate: "2024-09-12", orderCount: 84, totalSpend: 1284500, accountOwner: "S. Adhikari" },
  { id: "M-2103", name: "Patan Trade Lines", city: "Lalitpur", tier: "Gold", type: "Retailer", status: "Active", joinedDate: "2024-11-04", orderCount: 47, totalSpend: 612300, accountOwner: "R. Karki" },
  { id: "M-2188", name: "North Chowk Distributors", city: "Bhaktapur", tier: "Gold", type: "Bulk Buyer", status: "Active", joinedDate: "2025-01-22", orderCount: 39, totalSpend: 489200, accountOwner: "S. Adhikari" },
  { id: "M-2241", name: "Phewa Commerce", city: "Pokhara", tier: "Standard", type: "TikTok Seller", status: "Renewal Due", joinedDate: "2025-02-15", orderCount: 18, totalSpend: 142800, accountOwner: "A. Shrestha" },
  { id: "M-2310", name: "Border Supply Group", city: "Birgunj", tier: "Platinum", type: "Bulk Buyer", status: "Active", joinedDate: "2024-07-30", orderCount: 122, totalSpend: 2104900, accountOwner: "R. Karki" },
  { id: "M-2402", name: "Indra Marketplace", city: "Kathmandu", tier: "Gold", type: "Daraz Seller", status: "Active", joinedDate: "2025-03-08", orderCount: 26, totalSpend: 318400, accountOwner: "A. Shrestha" },
  { id: "M-2476", name: "Ascent Wholesale", city: "Delhi NCR", tier: "Founding", type: "Regional Wholesaler", status: "Pending Review", joinedDate: "2026-04-02", orderCount: 0, totalSpend: 0, accountOwner: "M. Rana" },
  { id: "M-2510", name: "Coastal Goods House", city: "Chennai", tier: "Gold", type: "Retailer", status: "Active", joinedDate: "2025-12-19", orderCount: 31, totalSpend: 402100, accountOwner: "M. Rana" },
];

export const suppliers: Supplier[] = [
  { id: "S-101", name: "Yiwu Standard Hardware", region: "Yiwu", category: "Home Utility", moq: 500, leadTimeDays: 18, rating: 4.7, qualityScore: 96, verified: true },
  { id: "S-114", name: "Shenzhen Electron Cell", region: "Shenzhen", category: "Mobile Accessories", moq: 1000, leadTimeDays: 14, rating: 4.8, qualityScore: 97, verified: true },
  { id: "S-128", name: "Guangzhou Apparel Basics", region: "Guangzhou", category: "Fashion Basics", moq: 800, leadTimeDays: 22, rating: 4.5, qualityScore: 92, verified: true },
  { id: "S-141", name: "Pearl River Beauty Tools", region: "Guangzhou", category: "Beauty Tools", moq: 600, leadTimeDays: 20, rating: 4.6, qualityScore: 94, verified: true },
  { id: "S-156", name: "Yiwu Pack & Print", region: "Yiwu", category: "Packaging Supplies", moq: 2000, leadTimeDays: 12, rating: 4.4, qualityScore: 90, verified: true },
  { id: "S-172", name: "Shenzhen Small Appliance Works", region: "Shenzhen", category: "Small Appliances", moq: 300, leadTimeDays: 26, rating: 4.7, qualityScore: 95, verified: true },
];

export const products: Product[] = [
  { sku: "RSN-EA-0421", name: "65W GaN Charger, 2C-1A", category: "Electronics Accessories", moq: 500, wholesalePrice: 11.4, retailReference: 28, margin: 0.59, inventoryStatus: "In Stock", sourceRegion: "Shenzhen", shippingClass: "Cross-Border Express" },
  { sku: "RSN-MA-1109", name: "Braided USB-C Cable 1.5m", category: "Mobile Accessories", moq: 1000, wholesalePrice: 1.85, retailReference: 6.5, margin: 0.71, inventoryStatus: "In Stock", sourceRegion: "Shenzhen", shippingClass: "Air" },
  { sku: "RSN-FB-2204", name: "Cotton Crew Neck Tee, Pack of 6", category: "Fashion Basics", moq: 800, wholesalePrice: 12.6, retailReference: 34, margin: 0.62, inventoryStatus: "Allocating", sourceRegion: "Guangzhou", shippingClass: "Sea" },
  { sku: "RSN-HU-3378", name: "Stainless Modular Storage Set", category: "Home Utility", moq: 500, wholesalePrice: 8.2, retailReference: 22, margin: 0.62, inventoryStatus: "In Stock", sourceRegion: "Yiwu", shippingClass: "Sea" },
  { sku: "RSN-BT-4140", name: "Ionic Hair Brush, OEM White", category: "Beauty Tools", moq: 600, wholesalePrice: 4.7, retailReference: 14, margin: 0.66, inventoryStatus: "On Order", sourceRegion: "Guangzhou", shippingClass: "Air" },
  { sku: "RSN-SA-5012", name: "Compact Air Fryer 4.5L", category: "Small Appliances", moq: 300, wholesalePrice: 38.4, retailReference: 92, margin: 0.58, inventoryStatus: "Low Stock", sourceRegion: "Shenzhen", shippingClass: "Sea" },
  { sku: "RSN-PS-6087", name: "Branded Mailer Boxes, 500ct", category: "Packaging Supplies", moq: 2000, wholesalePrice: 0.42, retailReference: 1.2, margin: 0.65, inventoryStatus: "In Stock", sourceRegion: "Yiwu", shippingClass: "Sea" },
];

export const orders: Order[] = [
  { id: "O-44012", member: "Border Supply Group", date: "2026-05-09", value: 184220, status: "Allocated", fulfillment: "Birgunj DC", eta: "2026-05-12", payment: "Wire" },
  { id: "O-44018", member: "Himalayan Retail Co.", date: "2026-05-09", value: 92400, status: "Dispatched", fulfillment: "Kathmandu DC", eta: "2026-05-11", payment: "Member Account" },
  { id: "O-44021", member: "Patan Trade Lines", date: "2026-05-08", value: 41800, status: "Confirmed", fulfillment: "Lalitpur Hub", eta: "2026-05-13", payment: "Escrow" },
  { id: "O-44027", member: "Coastal Goods House", date: "2026-05-08", value: 76300, status: "Dispatched", fulfillment: "Chennai Crossdock", eta: "2026-05-15", payment: "Credit Line" },
  { id: "O-44034", member: "Indra Marketplace", date: "2026-05-07", value: 22150, status: "Delivered", fulfillment: "Kathmandu DC", eta: "2026-05-09", payment: "Member Account" },
  { id: "O-44039", member: "Phewa Commerce", date: "2026-05-07", value: 14800, status: "Reconciled", fulfillment: "Pokhara Hub", eta: "2026-05-09", payment: "Wire" },
];

export const shipments: Shipment[] = [
  { id: "SHP-9821", route: "Yiwu → Kathmandu", status: "In Transit", courier: "RSN Cross-Border", dispatchDate: "2026-05-04", customsStage: "Tatopani Pre-Clearance", expectedDelivery: "2026-05-12", landedCost: 18420 },
  { id: "SHP-9834", route: "Shenzhen → Birgunj", status: "At Customs", courier: "RSN Air Bridge", dispatchDate: "2026-05-06", customsStage: "Birgunj ICP", expectedDelivery: "2026-05-11", landedCost: 9810 },
  { id: "SHP-9842", route: "Guangzhou → Delhi NCR", status: "Cleared", courier: "Partner Sea", dispatchDate: "2026-04-22", customsStage: "Cleared — Mundra", expectedDelivery: "2026-05-14", landedCost: 26240 },
  { id: "SHP-9856", route: "Yiwu → Pokhara", status: "Dispatched", courier: "RSN Cross-Border", dispatchDate: "2026-05-09", customsStage: "Origin", expectedDelivery: "2026-05-19", landedCost: 7610 },
  { id: "SHP-9863", route: "Shenzhen → Kolkata", status: "On Hold", courier: "Partner Air", dispatchDate: "2026-05-05", customsStage: "Documentation Review", expectedDelivery: "2026-05-13", landedCost: 12970 },
  { id: "SHP-9871", route: "Guangzhou → Chennai", status: "Delivered", courier: "Partner Sea", dispatchDate: "2026-04-12", customsStage: "Cleared — Chennai", expectedDelivery: "2026-05-08", landedCost: 21340 },
];

export const aiInsights: AIInsight[] = [
  { category: "Mobile Accessories", demandScore: 92, growthPrediction: "+18% next 30 days", supplyRisk: "Low", recommendedAction: "Pre-position 2× MOQ in Kathmandu DC", region: "Nepal", confidence: 0.94 },
  { category: "Small Appliances", demandScore: 78, growthPrediction: "+11% next 30 days", supplyRisk: "Moderate", recommendedAction: "Diversify away from single Shenzhen supplier", region: "Nepal + Delhi NCR", confidence: 0.86 },
  { category: "Beauty Tools", demandScore: 84, growthPrediction: "+22% next 30 days", supplyRisk: "Low", recommendedAction: "Open private-label window with Pearl River", region: "Nepal", confidence: 0.91 },
  { category: "Fashion Basics", demandScore: 71, growthPrediction: "+6% next 30 days", supplyRisk: "Elevated", recommendedAction: "Hold buying — monitor cotton index two weeks", region: "South Asia", confidence: 0.79 },
];

export const heroDashboardMetrics = [
  { label: "Active Members", value: "1,284", delta: "+12.4%" },
  { label: "Orders Processed", value: "8,471", delta: "+9.1%" },
  { label: "Supplier Network", value: "312", delta: "+24" },
  { label: "Cross-Border Routes", value: "11", delta: "+2" },
];

export const executiveMetrics = [
  { label: "Monthly Revenue", value: "$4.82M", delta: "+14.2%", positive: true },
  { label: "Gross Merchandise Value", value: "$11.6M", delta: "+18.7%", positive: true },
  { label: "Active Members", value: "1,284", delta: "+12.4%", positive: true },
  { label: "Repeat Purchase Rate", value: "71%", delta: "+3.1%", positive: true },
  { label: "Stock Accuracy", value: "98.6%", delta: "+0.4%", positive: true },
  { label: "On-Time Delivery", value: "96.2%", delta: "−0.3%", positive: false },
  { label: "Quote Conversion", value: "44%", delta: "+5.0%", positive: true },
  { label: "Supplier Reliability", value: "94%", delta: "+1.2%", positive: true },
];

export const revenueSeries = [
  { month: "Jul", revenue: 2.1, gmv: 5.8 },
  { month: "Aug", revenue: 2.4, gmv: 6.4 },
  { month: "Sep", revenue: 2.8, gmv: 7.1 },
  { month: "Oct", revenue: 3.1, gmv: 8.0 },
  { month: "Nov", revenue: 3.5, gmv: 9.0 },
  { month: "Dec", revenue: 3.9, gmv: 9.7 },
  { month: "Jan", revenue: 4.0, gmv: 10.1 },
  { month: "Feb", revenue: 4.2, gmv: 10.6 },
  { month: "Mar", revenue: 4.5, gmv: 11.0 },
  { month: "Apr", revenue: 4.6, gmv: 11.3 },
  { month: "May", revenue: 4.82, gmv: 11.6 },
];

export const memberGrowth = [
  { month: "Jul", count: 412 },
  { month: "Aug", count: 498 },
  { month: "Sep", count: 612 },
  { month: "Oct", count: 738 },
  { month: "Nov", count: 854 },
  { month: "Dec", count: 962 },
  { month: "Jan", count: 1041 },
  { month: "Feb", count: 1108 },
  { month: "Mar", count: 1182 },
  { month: "Apr", count: 1238 },
  { month: "May", count: 1284 },
];

export const demandTrend = [
  { week: "W-12", mobile: 64, beauty: 52, home: 58, apparel: 49 },
  { week: "W-11", mobile: 68, beauty: 56, home: 60, apparel: 51 },
  { week: "W-10", mobile: 72, beauty: 61, home: 63, apparel: 54 },
  { week: "W-09", mobile: 76, beauty: 67, home: 65, apparel: 56 },
  { week: "W-08", mobile: 79, beauty: 71, home: 67, apparel: 58 },
  { week: "W-07", mobile: 82, beauty: 74, home: 69, apparel: 61 },
  { week: "W-06", mobile: 85, beauty: 77, home: 70, apparel: 62 },
  { week: "W-05", mobile: 87, beauty: 80, home: 71, apparel: 64 },
  { week: "W-04", mobile: 89, beauty: 82, home: 72, apparel: 66 },
  { week: "W-03", mobile: 90, beauty: 83, home: 73, apparel: 67 },
  { week: "W-02", mobile: 91, beauty: 84, home: 73, apparel: 70 },
  { week: "W-01", mobile: 92, beauty: 84, home: 74, apparel: 71 },
];

export const regionHeatmap = [
  { region: "Kathmandu", load: 92 },
  { region: "Lalitpur", load: 78 },
  { region: "Bhaktapur", load: 64 },
  { region: "Pokhara", load: 56 },
  { region: "Birgunj", load: 88 },
  { region: "Delhi NCR", load: 41 },
  { region: "Chennai", load: 38 },
  { region: "Kolkata", load: 33 },
];

export const operationalAlerts = [
  { level: "info", title: "AI demand spike — Mobile Accessories", detail: "Pre-positioning recommended within 72 hours.", region: "Kathmandu" },
  { level: "warning", title: "Customs delay — SHP-9863", detail: "Documentation review at Birgunj ICP.", region: "Birgunj" },
  { level: "info", title: "New founding member application", detail: "Ascent Wholesale — Delhi NCR.", region: "Delhi NCR" },
  { level: "success", title: "Route optimisation deployed", detail: "Yiwu → Kathmandu lead time −14%.", region: "Cross-Border" },
];

export const platformPillars = [
  {
    title: "China Sourcing Authority",
    description:
      "Curated supplier access in Guangzhou, Shenzhen, and Yiwu. MOQ aggregation, quote engineering, and quality control before product enters our network.",
  },
  {
    title: "Cross-Border Logistics",
    description:
      "Owned cross-border lanes, customs sequencing, and warehouse coordination across Nepal entry points and India interchange hubs.",
  },
  {
    title: "Members-Only Wholesale",
    description:
      "Tiered membership with controlled catalog access, governed pricing, credit lines, and operations-led account management.",
  },
  {
    title: "AI Operations Layer",
    description:
      "Demand forecasting, supplier risk scoring, replenishment intelligence, and fulfilment routing — embedded across the operating stack.",
  },
];

export const architectureLayers = [
  {
    layer: "China Sourcing Layer",
    nodes: ["Supplier Portal", "MOQ Aggregation", "Quote Engine", "Quality Control"],
    note: "Guangzhou · Shenzhen · Yiwu",
  },
  {
    layer: "RSN Platform Core",
    nodes: ["Inventory", "Logistics", "Membership", "AI Intelligence"],
    note: "Operating system of the institution",
  },
  {
    layer: "South Asia Buyers",
    nodes: ["Retailers", "TikTok Sellers", "Daraz Sellers", "Bulk Buyers"],
    note: "Nepal pilot · India expansion",
  },
];

export const deliveryTiers = [
  {
    tier: "Same-Day Inventory",
    promise: "Order before 11:00 — delivered same business day across the Kathmandu valley.",
    requirement: "Held stock, member-priority allocation, dedicated last-mile lane.",
    example: "TikTok seller restocking a viral SKU before evening sales window.",
    badge: "Tier 01",
  },
  {
    tier: "Regional Warehouse Layer",
    promise: "48–72 hour fulfilment to Pokhara, Birgunj, Bhaktapur, and Lalitpur.",
    requirement: "Multi-node DC network, replenishment intelligence, route consolidation.",
    example: "Regional wholesaler covering three districts in a weekly cycle.",
    badge: "Tier 02",
  },
  {
    tier: "China Supply Pipeline",
    promise: "12–22 day landed delivery from Guangzhou, Shenzhen, and Yiwu.",
    requirement: "Qualified suppliers, owned customs lanes, pre-cleared documentation.",
    example: "Bulk buyer placing an MOQ-aggregated container on a fixed sailing.",
    badge: "Tier 03",
  },
];

export const deliveryMetrics = [
  { label: "Avg Delivery Time", value: "2.4 days" },
  { label: "Warehouse Accuracy", value: "98.6%" },
  { label: "Route Reliability", value: "96.2%" },
  { label: "Order Fill Rate", value: "97.8%" },
];

export const onboardingSteps = [
  {
    step: "01",
    title: "Application Review",
    body: "Operations evaluates business profile, channel mix, and procurement scale. Reviewed within five business days.",
  },
  {
    step: "02",
    title: "Member Verification",
    body: "Identity, registration, and trade-history verification. Tier eligibility is calibrated against operational fit.",
  },
  {
    step: "03",
    title: "Access Approval",
    body: "Catalog access, credit envelope, and account governance issued. Membership term begins on activation.",
  },
  {
    step: "04",
    title: "Concierge Activation",
    body: "Dedicated account owner, onboarding session, and first procurement cycle structured against member targets.",
  },
];

export const rolloutPhases = [
  {
    phase: "Phase 01",
    title: "Strategic Blueprint",
    description: "Platform architecture, sourcing partnerships, and operating governance defined in collaboration with anchor partners.",
    outcome: "Foundational design ratified · Supplier mandates secured",
    status: "Complete",
  },
  {
    phase: "Phase 02",
    title: "Nepal Pilot",
    description: "Controlled member cohort, single-region operations, and live AI feedback loop across Kathmandu valley.",
    outcome: "1,200+ members onboarded · 96.2% on-time delivery",
    status: "Active",
  },
  {
    phase: "Phase 03",
    title: "Nepal Scale",
    description: "Regional DCs across Pokhara, Birgunj, and Biratnagar. Tiered membership at full operating cadence.",
    outcome: "Target: $60M GMV · 4,000 members",
    status: "Planned",
  },
  {
    phase: "Phase 04",
    title: "India Expansion",
    description: "Sequenced entry through Delhi NCR, Chennai, and Kolkata. Cross-border lanes governed under RSN operating standards.",
    outcome: "Target: $240M GMV · institutional partners",
    status: "Planned",
  },
];
