"use client";

import { useState } from "react";
import { PortalShell, type PortalTab } from "@/components/portal/PortalShell";
import { CatalogView } from "@/components/portal/CatalogView";
import { ProductDetailDrawer } from "@/components/portal/ProductDetailDrawer";
import { OrderBuilder, type CartLine } from "@/components/portal/OrderBuilder";
import { OrdersView } from "@/components/portal/OrdersView";
import { ShipmentsView } from "@/components/portal/ShipmentsView";
import { QuotesView } from "@/components/portal/QuotesView";
import { AccountView } from "@/components/portal/AccountView";
import { useT } from "@/lib/lang";

export default function PortalPage() {
  const t = useT();
  const [tab, setTab] = useState<PortalTab>("catalog");
  const [activeSku, setActiveSku] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);

  const openProduct = (sku: string) => {
    setActiveSku(sku);
    setDrawerOpen(true);
  };

  const addToCart = (sku: string, qty: number, unitPrice: number) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.sku === sku);
      if (existing) {
        return prev.map((l) =>
          l.sku === sku ? { ...l, qty, unitPrice } : l
        );
      }
      return [...prev, { sku, qty, unitPrice }];
    });
  };

  const removeFromCart = (sku: string) =>
    setCart((prev) => prev.filter((l) => l.sku !== sku));

  const showSide = tab === "catalog";

  return (
    <>
      <PortalShell
        tab={tab}
        onTab={setTab}
        side={
          showSide ? (
            <OrderBuilder
              lines={cart}
              onRemove={removeFromCart}
              onClear={() => setCart([])}
              onSubmit={() => {
                alert(
                  t(
                    "Order submitted for allocation. Operations will respond within 1 business hour.",
                    "订单已提交分货。运营团队将在 1 个工作小时内回复。"
                  )
                );
                setCart([]);
              }}
            />
          ) : undefined
        }
      >
        {tab === "catalog" && <CatalogView onSelect={openProduct} />}
        {tab === "orders" && <OrdersView />}
        {tab === "shipments" && <ShipmentsView />}
        {tab === "quotes" && <QuotesView />}
        {tab === "account" && <AccountView />}
      </PortalShell>

      <ProductDetailDrawer
        sku={activeSku}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onAdd={addToCart}
      />
    </>
  );
}
