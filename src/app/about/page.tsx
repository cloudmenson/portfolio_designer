"use client";

import { useState } from "react";

import { About } from "@/widgets/about";
import { Header } from "@/widgets/header";
import { Loader } from "@/shared/ui/loader";
import { navItems } from "@/shared/data/modal";
import test from "@/shared/assets/png/creator.jpg";
import MainModal from "@/shared/ui/modals/main-modal";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {isVisible && (
        <Loader isVisible={isVisible} setIsVisible={setIsVisible} />
      )}

      <Header setOpenModal={setOpenModal} />

      <main className="relative mt-30 mb-20 md:mt-20">
        <About imageSrc={test} />

        <MainModal
          open={openModal}
          items={navItems}
          onClose={() => setOpenModal(false)}
        />
      </main>
    </>
  );
}
