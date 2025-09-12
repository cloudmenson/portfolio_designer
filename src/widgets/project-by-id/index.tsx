"use client";

import { Card } from "@/shared/ui/cards/card";
import { IProjects } from "@/shared/data/projects";

interface IProjectById {
  projectData: IProjects;
}

export default function ProjectById({ projectData }: IProjectById) {
  return (
    <section
      id="projects-by-id-section"
      className="relative mx-auto px-15 lg:pt-40 lg:pb-28"
    >
      <h2 className="mb-8 flex items-end text-3xl leading-none uppercase font-extrabold justify-center tracking-tight text-white md:mb-20 md:text-7xl">
        {projectData.title}
      </h2>

      <div data-grid className="grid grid-cols-1 auto-rows-[300px]">
        <Card item={projectData} />
      </div>
    </section>
  );
}
