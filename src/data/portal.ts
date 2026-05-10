/**
 * RSN Member Portal — wholesale-grade dummy data.
 * Extends rsn.ts with MOQ tiers, landed-cost components, quote requests.
 */

import type { Product, Supplier } from "./rsn";
import { products as baseProducts, suppliers as baseSuppliers } from "./rsn";

export interface MoqTier {
  qty: number;
  price: number;          // unit USD
  leadTimeDays: number;
}

export interface FreightRate {
  shippingClass: "Air" | "Sea" | "Cross-Border Express";
  /** USD per unit, rough indicative */
  perUnit: number;
  durationDays: [number, number]; // min, max
  route: string;
}

export interface DutyBracket {
  category: string;
  /** % of FOB */
  duty: number;
  /** % of landed pre-tax */
  vat: number;
}

export interface PortalProduct extends Product {
  /** SKU-level details */
  description: string;
  specs: { k: string; v: string }[];
  imageHue: number;        // 0-360 for placeholder gradient
  image: string;           // primary product photo URL
  tags: string[];
  moqTiers: MoqTier[];
  supplierId: string;
  rating: number;          // out of 5
  reviewCount: number;
  /** AI demand score 0-100 */
  demandScore: number;
}

export interface PortalSupplier extends Supplier {
  yearsActive: number;
  specialties: string[];
  /** factory size in m² */
  factorySize: number;
  /** % on-time delivery */
  onTime: number;
}

export interface PortalOrder {
  id: string;
  date: string;
  status:
    | "Draft"
    | "Submitted"
    | "Allocated"
    | "Production"
    | "Dispatched"
    | "In Transit"
    | "Delivered"
    | "Reconciled";
  lines: {
    sku: string;
    qty: number;
    unitPrice: number;
  }[];
  subtotal: number;
  freight: number;
  duty: number;
  handling: number;
  total: number;
  fulfillment: string;
  eta: string;
  payment: "Wire" | "Credit Line" | "Escrow" | "Member Account";
}

export interface PortalShipment {
  id: string;
  orderId: string;
  route: string;
  origin: string;
  destination: string;
  status:
    | "Booked"
    | "Dispatched"
    | "In Transit"
    | "At Customs"
    | "Cleared"
    | "Out for Delivery"
    | "Delivered";
  carrier: string;
  vessel?: string;
  containerId?: string;
  cbm: number;
  weightKg: number;
  events: { ts: string; stage: string; location: string }[];
  expectedDelivery: string;
  landedCost: number;
}

export interface PortalQuote {
  id: string;
  category: string;
  description: string;
  targetQty: number;
  desiredLeadTime: string;
  status: "Open" | "Quoting" | "Quote Ready" | "Accepted" | "Declined";
  requestedAt: string;
  responseTime?: string;
  quotedPrice?: number;
  quotedLeadDays?: number;
  recommendedSupplier?: string;
}

export const currentMember = {
  id: "M-2103",
  name: "Patan Trade Lines",
  contact: "Riya Maharjan",
  city: "Lalitpur, Nepal",
  tier: "Gold" as const,
  joinedDate: "2024-11-04",
  accountOwner: "R. Karki",
  conciergeChannel: "Concierge · #pat-trade-2103",
  creditLine: 250000,
  creditUsed: 92400,
  ytdSpend: 612300,
  openOrders: 3,
  activeShipments: 4,
};

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`;

const productMeta: Record<
  string,
  Pick<PortalProduct, "description" | "specs" | "imageHue" | "image" | "tags" | "moqTiers" | "supplierId" | "rating" | "reviewCount" | "demandScore">
> = {
  "RSN-EA-0421": {
    description:
      "Three-port GaN fast charger, USB-C PD 3.0 + USB-A QC 3.0. Member SKU is pre-certified for Nepal and Indian retail channels.",
    specs: [
      { k: "Output", v: "65W max · 2C-1A" },
      { k: "Compliance", v: "BIS · CCC · CE · FCC" },
      { k: "Warranty", v: "12 months · RSN-backed" },
      { k: "Carton qty", v: "50 pcs / master" },
      { k: "Master CBM", v: "0.062 m³" },
    ],
    imageHue: 38,
    image: IMG("photo-1583394838336-acd977736f90"),
    tags: ["High demand", "Member SKU", "Pre-certified"],
    moqTiers: [
      { qty: 500, price: 11.4, leadTimeDays: 16 },
      { qty: 1000, price: 10.8, leadTimeDays: 18 },
      { qty: 2500, price: 9.9, leadTimeDays: 22 },
      { qty: 5000, price: 9.2, leadTimeDays: 26 },
    ],
    supplierId: "S-114",
    rating: 4.8,
    reviewCount: 142,
    demandScore: 92,
  },
  "RSN-MA-1109": {
    description:
      "Braided 1.5m USB-C cable. Members receive batch sampling reports; tested at 5A draw across 6,000 cycles.",
    specs: [
      { k: "Length", v: "1.5 m · braided nylon" },
      { k: "Current", v: "5A continuous" },
      { k: "Bend cycles", v: "6,000 verified" },
      { k: "Carton qty", v: "200 pcs / master" },
      { k: "Master CBM", v: "0.045 m³" },
    ],
    imageHue: 22,
    image: IMG("photo-1591290619762-c65bbe1ce0bf"),
    tags: ["Reorder Top 10", "Member SKU"],
    moqTiers: [
      { qty: 1000, price: 1.85, leadTimeDays: 12 },
      { qty: 5000, price: 1.6, leadTimeDays: 14 },
      { qty: 10000, price: 1.42, leadTimeDays: 16 },
      { qty: 25000, price: 1.28, leadTimeDays: 20 },
    ],
    supplierId: "S-114",
    rating: 4.9,
    reviewCount: 318,
    demandScore: 88,
  },
  "RSN-FB-2204": {
    description:
      "200 GSM combed cotton crew tee. Pre-shrunk, ringspun, oeko-tex. Available in standard size run.",
    specs: [
      { k: "Fabric", v: "200 GSM combed cotton" },
      { k: "Sizes", v: "S–XXL · standard run" },
      { k: "Pack", v: "6 pcs assorted size" },
      { k: "Carton qty", v: "20 packs / master" },
      { k: "Master CBM", v: "0.094 m³" },
    ],
    imageHue: 200,
    image: IMG("photo-1521572163474-6864f9cf17ab"),
    tags: ["Allocating"],
    moqTiers: [
      { qty: 800, price: 12.6, leadTimeDays: 22 },
      { qty: 2400, price: 11.4, leadTimeDays: 24 },
      { qty: 6000, price: 10.5, leadTimeDays: 28 },
    ],
    supplierId: "S-128",
    rating: 4.5,
    reviewCount: 87,
    demandScore: 71,
  },
  "RSN-HU-3378": {
    description:
      "Modular stainless steel storage set, three sizes. Polished finish, food-grade 304 SS. Member-pricing pack of three.",
    specs: [
      { k: "Material", v: "304 stainless steel" },
      { k: "Set", v: "3 sizes · 1L · 2L · 4L" },
      { k: "Finish", v: "Mirror polish" },
      { k: "Carton qty", v: "12 sets / master" },
      { k: "Master CBM", v: "0.110 m³" },
    ],
    imageHue: 260,
    image: IMG("photo-1556228720-195a672e8a03"),
    tags: ["Reorder", "Premium"],
    moqTiers: [
      { qty: 500, price: 8.2, leadTimeDays: 24 },
      { qty: 1500, price: 7.4, leadTimeDays: 28 },
      { qty: 3000, price: 6.8, leadTimeDays: 30 },
    ],
    supplierId: "S-101",
    rating: 4.7,
    reviewCount: 156,
    demandScore: 64,
  },
  "RSN-BT-4140": {
    description:
      "Ionic mid-range hair brush in OEM white. Tested for export channels; member SKU includes neutral packaging option.",
    specs: [
      { k: "Power", v: "USB-C · 1200 mAh" },
      { k: "Bristles", v: "Tourmaline ceramic" },
      { k: "Modes", v: "3 heat · 2 ion" },
      { k: "Carton qty", v: "40 pcs / master" },
      { k: "Master CBM", v: "0.078 m³" },
    ],
    imageHue: 320,
    image: IMG("photo-1522338242992-e1a54906a8da"),
    tags: ["High demand", "AI: pre-position"],
    moqTiers: [
      { qty: 600, price: 4.7, leadTimeDays: 20 },
      { qty: 1800, price: 4.1, leadTimeDays: 22 },
      { qty: 4000, price: 3.65, leadTimeDays: 26 },
    ],
    supplierId: "S-141",
    rating: 4.6,
    reviewCount: 94,
    demandScore: 84,
  },
  "RSN-SA-5012": {
    description:
      "Compact 4.5L digital air fryer with regional voltage SKUs. Members get tier-2 warranty service via local partner.",
    specs: [
      { k: "Capacity", v: "4.5 L" },
      { k: "Power", v: "1500 W · 220V" },
      { k: "Plate", v: "Type-D · regional" },
      { k: "Carton qty", v: "4 pcs / master" },
      { k: "Master CBM", v: "0.198 m³" },
    ],
    imageHue: 12,
    image: IMG("photo-1626078299034-94400a23dad7"),
    tags: ["Low Stock", "Premium"],
    moqTiers: [
      { qty: 300, price: 38.4, leadTimeDays: 26 },
      { qty: 800, price: 35.2, leadTimeDays: 30 },
      { qty: 2000, price: 32.4, leadTimeDays: 34 },
    ],
    supplierId: "S-172",
    rating: 4.7,
    reviewCount: 71,
    demandScore: 78,
  },
  "RSN-PS-6087": {
    description:
      "Branded mailer boxes, 500 pieces per pack. Member SKU includes free 2-color print onboarding.",
    specs: [
      { k: "Material", v: "350 GSM kraft" },
      { k: "Print", v: "2-color included" },
      { k: "Sizes", v: "S · M · L · XL" },
      { k: "Pack", v: "500 pcs / pack" },
      { k: "Master CBM", v: "0.18 m³" },
    ],
    imageHue: 80,
    image: IMG("photo-1607344645866-009c320b63e0"),
    tags: ["Operations"],
    moqTiers: [
      { qty: 2000, price: 0.42, leadTimeDays: 12 },
      { qty: 8000, price: 0.36, leadTimeDays: 14 },
      { qty: 20000, price: 0.31, leadTimeDays: 16 },
    ],
    supplierId: "S-156",
    rating: 4.4,
    reviewCount: 52,
    demandScore: 58,
  },
};

export const portalProducts: PortalProduct[] = baseProducts.map((p) => ({
  ...p,
  ...productMeta[p.sku],
}));

const supplierMeta: Record<string, Pick<PortalSupplier, "yearsActive" | "specialties" | "factorySize" | "onTime">> = {
  "S-101": { yearsActive: 14, specialties: ["Stainless tooling", "Modular kitchen"], factorySize: 4200, onTime: 95 },
  "S-114": { yearsActive: 11, specialties: ["GaN charging", "USB-C cable"], factorySize: 6800, onTime: 97 },
  "S-128": { yearsActive: 8, specialties: ["Knit basics", "Cotton tees"], factorySize: 9400, onTime: 92 },
  "S-141": { yearsActive: 9, specialties: ["Personal care", "Heated tools"], factorySize: 3100, onTime: 94 },
  "S-156": { yearsActive: 16, specialties: ["Kraft packaging", "Printed mailers"], factorySize: 5600, onTime: 90 },
  "S-172": { yearsActive: 12, specialties: ["Small kitchen appliances"], factorySize: 7200, onTime: 95 },
};

export const portalSuppliers: PortalSupplier[] = baseSuppliers.map((s) => ({
  ...s,
  ...supplierMeta[s.id],
}));

export const freightRates: FreightRate[] = [
  {
    shippingClass: "Cross-Border Express",
    perUnit: 0.42,
    durationDays: [12, 16],
    route: "China → Tatopani → Kathmandu",
  },
  {
    shippingClass: "Air",
    perUnit: 0.86,
    durationDays: [5, 8],
    route: "Shenzhen → KTM Air Bridge",
  },
  {
    shippingClass: "Sea",
    perUnit: 0.18,
    durationDays: [22, 32],
    route: "Yiwu → Kolkata → Birgunj",
  },
];

export const dutyBrackets: DutyBracket[] = [
  { category: "Mobile Accessories", duty: 0.10, vat: 0.13 },
  { category: "Electronics Accessories", duty: 0.15, vat: 0.13 },
  { category: "Fashion Basics", duty: 0.20, vat: 0.13 },
  { category: "Home Utility", duty: 0.18, vat: 0.13 },
  { category: "Beauty Tools", duty: 0.18, vat: 0.13 },
  { category: "Small Appliances", duty: 0.22, vat: 0.13 },
  { category: "Packaging Supplies", duty: 0.10, vat: 0.13 },
];

export const portalOrders: PortalOrder[] = [
  {
    id: "O-44021",
    date: "2026-05-08",
    status: "Production",
    lines: [
      { sku: "RSN-EA-0421", qty: 1000, unitPrice: 10.8 },
      { sku: "RSN-MA-1109", qty: 5000, unitPrice: 1.6 },
    ],
    subtotal: 18800,
    freight: 1240,
    duty: 2444,
    handling: 220,
    total: 22704,
    fulfillment: "Lalitpur Hub",
    eta: "2026-05-22",
    payment: "Member Account",
  },
  {
    id: "O-44034",
    date: "2026-05-07",
    status: "Delivered",
    lines: [{ sku: "RSN-MA-1109", qty: 10000, unitPrice: 1.42 }],
    subtotal: 14200,
    freight: 940,
    duty: 1514,
    handling: 180,
    total: 16834,
    fulfillment: "Kathmandu DC",
    eta: "2026-05-09",
    payment: "Member Account",
  },
  {
    id: "O-44039",
    date: "2026-05-05",
    status: "Reconciled",
    lines: [
      { sku: "RSN-BT-4140", qty: 1800, unitPrice: 4.1 },
      { sku: "RSN-PS-6087", qty: 8000, unitPrice: 0.36 },
    ],
    subtotal: 10260,
    freight: 720,
    duty: 1644,
    handling: 140,
    total: 12764,
    fulfillment: "Pokhara Hub",
    eta: "2026-04-30",
    payment: "Wire",
  },
];

export const portalShipments: PortalShipment[] = [
  {
    id: "SHP-9821",
    orderId: "O-44021",
    route: "Yiwu → Kathmandu",
    origin: "Yiwu, China",
    destination: "Lalitpur, Nepal",
    status: "In Transit",
    carrier: "RSN Cross-Border",
    containerId: "RSCU-4421-9",
    cbm: 8.4,
    weightKg: 2840,
    events: [
      { ts: "2026-05-04 09:12", stage: "Booked at origin", location: "Yiwu IWC" },
      { ts: "2026-05-05 14:38", stage: "Container sealed", location: "Yiwu IWC" },
      { ts: "2026-05-07 06:20", stage: "Departed Yiwu", location: "Yiwu IWC" },
      { ts: "2026-05-09 18:14", stage: "At Tatopani gateway", location: "Tatopani CN/NP" },
      { ts: "2026-05-10 11:02", stage: "Pre-clearance docs filed", location: "Tatopani NP" },
    ],
    expectedDelivery: "2026-05-12",
    landedCost: 18420,
  },
  {
    id: "SHP-9834",
    orderId: "O-44034",
    route: "Shenzhen → Birgunj",
    origin: "Shenzhen, China",
    destination: "Birgunj, Nepal",
    status: "At Customs",
    carrier: "RSN Air Bridge",
    cbm: 0.94,
    weightKg: 240,
    events: [
      { ts: "2026-05-06 04:00", stage: "Departed SZX", location: "Shenzhen" },
      { ts: "2026-05-07 22:11", stage: "Arrived BIR", location: "Birgunj ICP" },
      { ts: "2026-05-09 09:30", stage: "Customs review", location: "Birgunj ICP" },
    ],
    expectedDelivery: "2026-05-11",
    landedCost: 9810,
  },
  {
    id: "SHP-9856",
    orderId: "O-44021",
    route: "Yiwu → Pokhara",
    origin: "Yiwu, China",
    destination: "Pokhara, Nepal",
    status: "Booked",
    carrier: "RSN Cross-Border",
    containerId: "RSCU-4422-1",
    cbm: 4.2,
    weightKg: 1180,
    events: [
      { ts: "2026-05-09 11:20", stage: "Booked at origin", location: "Yiwu IWC" },
    ],
    expectedDelivery: "2026-05-19",
    landedCost: 7610,
  },
  {
    id: "SHP-9871",
    orderId: "O-44039",
    route: "Guangzhou → Chennai",
    origin: "Guangzhou, China",
    destination: "Chennai, India",
    status: "Delivered",
    carrier: "Partner Sea",
    vessel: "Wan Hai 511",
    cbm: 12.6,
    weightKg: 3940,
    events: [
      { ts: "2026-04-12 09:00", stage: "Vessel departed", location: "Nansha Port" },
      { ts: "2026-04-30 14:20", stage: "Vessel arrived", location: "Chennai Port" },
      { ts: "2026-05-02 10:45", stage: "Customs cleared", location: "Chennai" },
      { ts: "2026-05-08 15:30", stage: "Delivered to consignee", location: "Coastal Goods House DC" },
    ],
    expectedDelivery: "2026-05-08",
    landedCost: 21340,
  },
];

export const portalQuotes: PortalQuote[] = [
  {
    id: "Q-3104",
    category: "Beauty Tools",
    description: "Ionic hair brush — private label with neutral packaging. Box-set option.",
    targetQty: 4000,
    desiredLeadTime: "Within 28 days",
    status: "Quote Ready",
    requestedAt: "2026-05-04",
    responseTime: "2026-05-06",
    quotedPrice: 3.42,
    quotedLeadDays: 26,
    recommendedSupplier: "Pearl River Beauty Tools",
  },
  {
    id: "Q-3118",
    category: "Small Appliances",
    description: "Compact air fryer — Type-D plug, regional packaging.",
    targetQty: 1200,
    desiredLeadTime: "Within 35 days",
    status: "Quoting",
    requestedAt: "2026-05-08",
  },
  {
    id: "Q-3124",
    category: "Packaging Supplies",
    description: "Branded mailer boxes — 4 sizes, 2-color print, 25,000 pcs.",
    targetQty: 25000,
    desiredLeadTime: "Within 18 days",
    status: "Open",
    requestedAt: "2026-05-09",
  },
];

/** AI feed tailored to the portal user */
export const portalAIInsights = [
  {
    sku: "RSN-MA-1109",
    headline: "Reorder window opens",
    detail: "Your sell-through is +24% week-on-week. Suggested reorder: 8,000 units for 7-day buffer.",
    confidence: 0.93,
    action: "Build reorder",
  },
  {
    sku: "RSN-BT-4140",
    headline: "Demand spike detected",
    detail: "Beauty Tools index +22% in 30 days. Consider 1,800 unit pre-position to Kathmandu DC.",
    confidence: 0.91,
    action: "Add to order",
  },
  {
    sku: "RSN-EA-0421",
    headline: "Better tier available",
    detail: "Lift to 2,500 units to unlock −8.3% per-unit pricing on the next bracket.",
    confidence: 0.96,
    action: "Lift to 2,500",
  },
];

/** Simple landed-cost helper */
export function computeLanded(opts: {
  qty: number;
  unitPrice: number;
  category: string;
  shippingClass: PortalProduct["shippingClass"];
}) {
  const subtotal = opts.qty * opts.unitPrice;
  const rate = freightRates.find((r) => r.shippingClass === opts.shippingClass);
  const freight = rate ? rate.perUnit * opts.qty : 0;
  const bracket = dutyBrackets.find((d) => d.category === opts.category);
  const fobAndFreight = subtotal + freight;
  const duty = bracket ? fobAndFreight * bracket.duty : 0;
  const handling = subtotal * 0.012; // 1.2% RSN handling fee
  const total = subtotal + freight + duty + handling;
  return {
    subtotal,
    freight,
    duty,
    handling,
    total,
    durationDays: rate?.durationDays ?? [0, 0],
  };
}
