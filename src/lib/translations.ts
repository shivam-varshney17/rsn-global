/**
 * Centralized translation dictionaries for data-driven strings.
 * Components read these to translate values that come from mock data
 * (cities, payment types, customs stages, product names, etc).
 */

export const CITY: Record<string, string> = {
  Kathmandu: "加德满都",
  Lalitpur: "拉利特普尔",
  Bhaktapur: "巴克塔普尔",
  Pokhara: "博卡拉",
  Birgunj: "比尔根杰",
  Biratnagar: "比拉特讷格尔",
  "Delhi NCR": "德里 NCR",
  Chennai: "金奈",
  Kolkata: "加尔各答",
  Mumbai: "孟买",
  Guangzhou: "广州",
  Shenzhen: "深圳",
  Yiwu: "义乌",
  Nepal: "尼泊尔",
  India: "印度",
  China: "中国",
  "South Asia": "南亚",
  "Cross-Border": "跨境",
  "Lalitpur, Nepal": "尼泊尔 拉利特普尔",
  "Yiwu, China": "中国 义乌",
  "Shenzhen, China": "中国 深圳",
  "Guangzhou, China": "中国 广州",
  "Lalitpur, Nepal ": "尼泊尔 拉利特普尔",
};

export const PAYMENT: Record<string, string> = {
  Wire: "电汇",
  "Credit Line": "信用额度",
  Escrow: "第三方托管",
  "Member Account": "会员账户",
};

export const FULFILLMENT: Record<string, string> = {
  "Lalitpur Hub": "拉利特普尔仓",
  "Kathmandu DC": "加德满都配送中心",
  "Pokhara Hub": "博卡拉仓",
  "Birgunj DC": "比尔根杰配送中心",
  "Chennai Crossdock": "金奈中转仓",
  "Coastal Goods House DC": "Coastal Goods House 配送中心",
};

export const CUSTOMS: Record<string, string> = {
  "Tatopani Pre-Clearance": "塔托帕尼预清关",
  "Birgunj ICP": "比尔根杰 ICP 口岸",
  "Cleared — Mundra": "蒙德拉港已清关",
  "Cleared — Chennai": "金奈已清关",
  Origin: "出发地",
  "Documentation Review": "单据复核中",
};

export const EVENT_STAGE: Record<string, string> = {
  "Booked at origin": "出发地已订舱",
  "Container sealed": "集装箱已封箱",
  "Departed Yiwu": "已离开义乌",
  "Departed SZX": "已离开深圳",
  "At Tatopani gateway": "抵达塔托帕尼口岸",
  "Pre-clearance docs filed": "预清关单据已提交",
  "Arrived BIR": "抵达比尔根杰",
  "Customs review": "海关复核中",
  "Vessel departed": "船次已起航",
  "Vessel arrived": "船次已抵港",
  "Customs cleared": "已清关",
  "Delivered to consignee": "已交付收货方",
};

export const EVENT_LOC: Record<string, string> = {
  "Yiwu IWC": "义乌 IWC",
  "Tatopani CN/NP": "塔托帕尼 中国/尼泊尔",
  "Tatopani NP": "塔托帕尼 尼泊尔",
  Shenzhen: "深圳",
  "Birgunj ICP": "比尔根杰 ICP",
  "Nansha Port": "南沙港",
  "Chennai Port": "金奈港",
  Chennai: "金奈",
  "Coastal Goods House DC": "Coastal Goods House 配送中心",
};

export const CARRIER: Record<string, string> = {
  "RSN Cross-Border": "RSN 跨境",
  "RSN Air Bridge": "RSN 空运通路",
  "Partner Sea": "合作海运",
  "Partner Air": "合作空运",
};

export const PRODUCT_CATEGORY: Record<string, string> = {
  "Electronics Accessories": "电子配件",
  "Mobile Accessories": "手机配件",
  "Fashion Basics": "服饰基础款",
  "Home Utility": "家居日用",
  "Beauty Tools": "美妆工具",
  "Small Appliances": "小家电",
  "Packaging Supplies": "包装耗材",
};

export const PRODUCT_NAME: Record<string, string> = {
  "65W GaN Charger, 2C-1A": "65W GaN 充电器,2C-1A",
  "Braided USB-C Cable 1.5m": "编织 USB-C 数据线 1.5 米",
  "Cotton Crew Neck Tee, Pack of 6": "纯棉圆领 T 恤(6 件装)",
  "Stainless Modular Storage Set": "不锈钢模块化储物套装",
  "Ionic Hair Brush, OEM White": "负离子梳(OEM 白)",
  "Compact Air Fryer 4.5L": "紧凑型空气炸锅 4.5 升",
  "Branded Mailer Boxes, 500ct": "定制快递盒(500 个/包)",
};

export const PRODUCT_DESC: Record<string, string> = {
  "RSN-EA-0421":
    "三口 GaN 快充充电器,USB-C PD 3.0 + USB-A QC 3.0。会员专属 SKU 已通过尼泊尔与印度零售渠道认证。",
  "RSN-MA-1109":
    "1.5 米编织线身的 USB-C 数据线。提供批次抽检报告,在 5A 电流下完成 6,000 次弯折测试。",
  "RSN-FB-2204":
    "200 GSM 精梳棉圆领 T 恤,预缩水、环锭纺、Oeko-Tex 认证,标准尺码全套供应。",
  "RSN-HU-3378":
    "三件套不锈钢模块化储物罐,镜面抛光,304 食品级不锈钢,会员价提供三件组合包。",
  "RSN-BT-4140":
    "中端负离子电热梳,OEM 白色机身,出口渠道已通过测试,会员 SKU 可选用中性外包装。",
  "RSN-SA-5012":
    "4.5 升数显紧凑型空气炸锅,提供地区电压 SKU。会员可通过本地合作方享受二级保修服务。",
  "RSN-PS-6087":
    "定制快递盒,500 个一包。会员 SKU 包含免费两色印刷上线服务。",
};

export const SPEC_KEY: Record<string, string> = {
  Output: "输出功率",
  Compliance: "认证合规",
  Warranty: "保修",
  "Carton qty": "外箱数量",
  "Master CBM": "外箱体积",
  Length: "长度",
  Current: "电流",
  "Bend cycles": "弯折次数",
  Fabric: "面料",
  Sizes: "尺码",
  Pack: "包装",
  Material: "材质",
  Set: "套装",
  Finish: "表面工艺",
  Power: "功率",
  Bristles: "刷头",
  Modes: "模式",
  Capacity: "容量",
  Plate: "插头规格",
  Print: "印刷",
};

export const SPEC_VAL: Record<string, string> = {
  "65W max · 2C-1A": "最大 65W · 2 个 USB-C + 1 个 USB-A",
  "BIS · CCC · CE · FCC": "BIS · CCC · CE · FCC",
  "12 months · RSN-backed": "12 个月 · 由 RSN 提供保修",
  "50 pcs / master": "50 件/箱",
  "0.062 m³": "0.062 立方米",
  "1.5 m · braided nylon": "1.5 米 · 编织尼龙",
  "5A continuous": "持续 5A",
  "6,000 verified": "6,000 次实测",
  "200 pcs / master": "200 件/箱",
  "0.045 m³": "0.045 立方米",
  "200 GSM combed cotton": "200 GSM 精梳棉",
  "S–XXL · standard run": "S–XXL · 标准尺码",
  "6 pcs assorted size": "6 件 混合尺码",
  "20 packs / master": "20 包/箱",
  "0.094 m³": "0.094 立方米",
  "304 stainless steel": "304 不锈钢",
  "3 sizes · 1L · 2L · 4L": "3 个规格 · 1L · 2L · 4L",
  "Mirror polish": "镜面抛光",
  "12 sets / master": "12 套/箱",
  "0.110 m³": "0.110 立方米",
  "USB-C · 1200 mAh": "USB-C · 1200 mAh",
  "Tourmaline ceramic": "陶瓷电气石",
  "3 heat · 2 ion": "3 档加热 · 2 档负离子",
  "40 pcs / master": "40 件/箱",
  "0.078 m³": "0.078 立方米",
  "4.5 L": "4.5 升",
  "1500 W · 220V": "1500W · 220V",
  "Type-D · regional": "Type-D · 区域适配",
  "4 pcs / master": "4 件/箱",
  "0.198 m³": "0.198 立方米",
  "350 GSM kraft": "350 GSM 牛皮纸",
  "2-color included": "包含两色印刷",
  "S · M · L · XL": "S · M · L · XL",
  "500 pcs / pack": "500 件/包",
  "0.18 m³": "0.18 立方米",
};

export const SUPPLIER_NAME: Record<string, string> = {
  "Yiwu Standard Hardware": "义乌标准五金",
  "Shenzhen Electron Cell": "深圳 Electron Cell",
  "Guangzhou Apparel Basics": "广州 Apparel Basics",
  "Pearl River Beauty Tools": "珠江美妆工具",
  "Yiwu Pack & Print": "义乌 Pack & Print",
  "Shenzhen Small Appliance Works": "深圳小家电制造",
};

export const SUPPLIER_SPEC: Record<string, string> = {
  "Stainless tooling": "不锈钢模具",
  "Modular kitchen": "模块化厨具",
  "GaN charging": "GaN 快充",
  "USB-C cable": "USB-C 数据线",
  "Knit basics": "针织基本款",
  "Cotton tees": "纯棉 T 恤",
  "Personal care": "个护",
  "Heated tools": "电热工具",
  "Kraft packaging": "牛皮包装",
  "Printed mailers": "印刷快递盒",
  "Small kitchen appliances": "小型厨房家电",
};

export const MEMBER_TYPE: Record<string, string> = {
  Retailer: "零售商",
  "TikTok Seller": "TikTok 卖家",
  "Daraz Seller": "Daraz 卖家",
  "Bulk Buyer": "大宗买家",
  "Regional Wholesaler": "区域批发商",
};

export const MEMBER_TIER: Record<string, string> = {
  Founding: "创始",
  Platinum: "铂金",
  Gold: "金",
  Standard: "标准",
};

export const SHIP_CLASS: Record<string, string> = {
  Air: "空运",
  Sea: "海运",
  "Cross-Border Express": "跨境陆运",
};

/** Translate "City1, Country" by tokenizing with comma. */
export function translateCityPair(s: string, t: (en: string, zh: string) => string) {
  if (s.includes(", ")) {
    const [c, country] = s.split(", ");
    return `${t(c, CITY[c] ?? c)}, ${t(country, CITY[country] ?? country)}`;
  }
  return t(s, CITY[s] ?? s);
}

/** Translate "Yiwu → Kathmandu" routes. */
export function translateRoute(route: string, t: (en: string, zh: string) => string) {
  return route
    .split(" → ")
    .map((c) => t(c, CITY[c] ?? c))
    .join(" → ");
}

/** Generic dict-based translator. */
export function tr(
  s: string,
  dict: Record<string, string>,
  t: (en: string, zh: string) => string
) {
  return t(s, dict[s] ?? s);
}
