"use client";

import React, { useState } from "react";

import { Header } from "@/widgets/header";
import { Loader } from "@/shared/ui/loader";
import { navItems } from "@/shared/data/modal";
import { projects } from "@/shared/data/projects";
import { PortfolioGrid } from "@/widgets/projects";
import MainModal from "@/shared/ui/modals/main-modal";

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {isVisible && (
        <Loader isVisible={isVisible} setIsVisible={setIsVisible} />
      )}

      <Header setOpenModal={setOpenModal} />

      <main className="relative mt-30 mb-20 md:mt-40">
        <PortfolioGrid title="Projects" items={projects} />

        <MainModal
          open={openModal}
          items={navItems}
          onClose={() => setOpenModal(false)}
        />
      </main>
    </>
  );
}
