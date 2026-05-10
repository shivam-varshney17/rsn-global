"use client";

import { useState } from "react";
import { Navbar } from "@/components/rsn/Navbar";
import { Hero } from "@/components/rsn/Hero";
import { PillarsSection } from "@/components/rsn/PillarsSection";
import { ArchitectureSection } from "@/components/rsn/ArchitectureSection";
import { DeliverySection } from "@/components/rsn/DeliverySection";
import { MembershipSection } from "@/components/rsn/MembershipSection";
import { ExecutiveDashboard } from "@/components/rsn/ExecutiveDashboard";
import { TimelineSection } from "@/components/rsn/TimelineSection";
import { CTASection } from "@/components/rsn/CTASection";
import { Footer } from "@/components/rsn/Footer";
import { ApplyModal } from "@/components/rsn/ApplyModal";
import { DashboardDrawer } from "@/components/rsn/DashboardDrawer";

export default function RsnHome() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyVariant, setApplyVariant] = useState<"membership" | "founding">("membership");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openApply = (variant: "membership" | "founding" = "membership") => {
    setApplyVariant(variant);
    setApplyOpen(true);
  };

  const scrollToOverview = () => {
    document.querySelector("#platform")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <Navbar onApply={() => openApply("membership")} />
      <Hero onApply={() => openApply("membership")} onOverview={scrollToOverview} />
      <PillarsSection />
      <ArchitectureSection />
      <DeliverySection />
      <MembershipSection onApply={() => openApply("founding")} />
      <ExecutiveDashboard onOpenDrawer={() => setDrawerOpen(true)} />
      <TimelineSection />
      <CTASection onApply={() => openApply("founding")} />
      <Footer />

      <ApplyModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        variant={applyVariant}
      />
      <DashboardDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  );
}
