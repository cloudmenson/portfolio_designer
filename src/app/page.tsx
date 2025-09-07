"use client";

import React, { useState } from "react";

import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { Header } from "@/widgets/header";
import { PortfolioGrid } from "@/widgets/projects";
import test from "@/shared/assets/png/creator.jpg";
import { Cooperation } from "@/widgets/cooperation";
import CircularText from "@/shared/ui/circular-text";
import MainModal from "@/shared/ui/modals/main-modal";

const navItems = [
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contacts", href: "#contacts" },
];

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <React.Fragment>
      <Header setOpenModal={setOpenModal} />

      <main className="relative">
        <Hero />

        <PortfolioGrid />

        <About imageSrc={test} />

        <Cooperation />

        <MainModal
          open={openModal}
          items={navItems}
          onClose={() => setOpenModal(false)}
        />

        <CircularText
          onHover="speedUp"
          spinDuration={20}
          className="circular-text"
          text="MARTA*KOZEREMA*"
        />
      </main>
    </React.Fragment>
  );
}
