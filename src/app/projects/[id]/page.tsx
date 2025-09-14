"use client";

import { useState } from "react";

import { Header } from "@/widgets/header";
import { Loader } from "@/shared/ui/loader";
import { navItems } from "@/shared/data/modal";
import ProjectById from "@/widgets/project-by-id";
import { projects } from "@/shared/data/projects";
import MainModal from "@/shared/ui/modals/main-modal";

export default function ProjectByIdPage({ params }) {
  const projectData = projects.find((p) => String(p.id) === params.id);

  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Project not found.</p>
      </div>
    );
  }

  const [isVisible, setIsVisible] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {isVisible && (
        <Loader isVisible={isVisible} setIsVisible={setIsVisible} />
      )}

      <Header setOpenModal={setOpenModal} />

      <main className="relative mt-30 mb-20 md:mt-40">
        <ProjectById projectData={projectData} />

        <MainModal
          open={openModal}
          items={navItems}
          onClose={() => setOpenModal(false)}
        />
      </main>
    </>
  );
}
