"use client";

import React, { useState } from "react";

import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Loader } from "@/shared/ui/loader";
import { navItems } from "@/shared/data/modal";
import { projects } from "@/shared/data/projects";
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
        <Hero className="mb-25 sm:mb-50" />

        <PortfolioGrid
          items={projects}
          title="Latest portfolio"
          className="mb-25 sm:mb-50"
        />

        <About className="mb-25 sm:mb-50" imageSrc={test} />

        <Cooperation className="mb-10 sm:mb-50" />

        <Footer className="mb-100 sm:mb-50" />

        <MainModal
          open={openModal}
          items={navItems}
          onClose={() => setOpenModal(false)}
        />
      </main>
    </>
  );
}
