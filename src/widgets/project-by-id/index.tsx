"use client";

import { Card } from "@/shared/ui/cards/card";
import { IProjects } from "@/shared/data/projects";

interface IProjectById {
  projectData: IProjects;
}

export default function ProjectById({ projectData }: IProjectById) {
  console.log({ projectData });

  return (
    <section
      id="projects-by-id-section"
      className="relative mx-auto px-15 lg:pt-40 lg:pb-28"
    >
      <h2 className="mb-8 flex items-end text-3xl leading-none uppercase font-extrabold tracking-tight text-white md:mb-10 md:text-7xl">
        {projectData.title}
      </h2>

      <div
        data-grid
        className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px]"
      >
        <Card item={projectData} />
      </div>
    </section>
  );
}
