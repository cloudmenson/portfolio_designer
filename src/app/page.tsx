"use client";

import React, { useEffect, useState } from "react";

import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Loader } from "@/shared/ui/loader";
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      {!isMounted ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Header setOpenModal={setOpenModal} />

          <main className="relative mb-20">
            <Hero />

            <PortfolioGrid />

            <About imageSrc={test} />

            <Cooperation />

            <Footer />

            {/* <MainModal
              open={openModal}
              items={navItems}
              onClose={() => setOpenModal(false)}
            /> */}

            <CircularText
              onHover="speedUp"
              spinDuration={20}
              text="MARTA*KOZEREMA*"
              className="circular-text"
            />
          </main>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
