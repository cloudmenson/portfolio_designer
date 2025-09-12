"use client";

import { useState } from "react";

import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Loader } from "@/shared/ui/loader";
import { Contact } from "@/widgets/contact";
import { navItems } from "@/shared/data/modal";
import MainModal from "@/shared/ui/modals/main-modal";
import { SocialRow } from "@/shared/ui/social-row";

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {isVisible && (
        <Loader isVisible={isVisible} setIsVisible={setIsVisible} />
      )}

      <Header setOpenModal={setOpenModal} />

      <main className="relative mb-10 mx-auto max-w-7xl py-20 lg:pt-60 px-15">
        <Contact />

        <SocialRow />

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
