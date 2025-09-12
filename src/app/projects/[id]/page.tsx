"use client";

import { useState } from "react";

import { Header } from "@/widgets/header";
import { Loader } from "@/shared/ui/loader";
import { navItems } from "@/shared/data/modal";
import ProjectById from "@/widgets/project-by-id";
import { projects } from "@/shared/data/projects";
import MainModal from "@/shared/ui/modals/main-modal";

type Props = { params: { id: string } };

export default function ProjectByIdPage({ params }: Props) {
  const projectData = projects.find((p) => String(p.id) === params.id);

  const [isVisible, setIsVisible] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Project not found.</p>
      </div>
    );
  }

  return (
    <>
      {isVisible && (
        <Loader isVisible={isVisible} setIsVisible={setIsVisible} />
      )}

      <Header setOpenModal={setOpenModal} />

      <ProjectById projectData={projectData} />

      <MainModal
        open={openModal}
        items={navItems}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}
