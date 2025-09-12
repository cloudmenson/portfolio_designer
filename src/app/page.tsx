"use client";

import React, { useState } from "react";

import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Loader } from "@/shared/ui/loader";
import { navItems } from "@/shared/data/modal";
import { PortfolioGrid } from "@/widgets/projects";
import test from "@/shared/assets/png/creator.jpg";
import { Cooperation } from "@/widgets/cooperation";
import MainModal from "@/shared/ui/modals/main-modal";

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible && (
        <Loader isVisible={isVisible} setIsVisible={setIsVisible} />
      )}

      <Header setOpenModal={setOpenModal} />

      <main className="relative mb-20">
        <Hero />

        <PortfolioGrid />

        <About imageSrc={test} />

        <Cooperation />

        <Footer />

        <MainModal
          open={openModal}
          items={navItems}
          onClose={() => setOpenModal(false)}
        />
      </main>
    </>
  );
}
