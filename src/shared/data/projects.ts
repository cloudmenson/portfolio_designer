import { StaticImageData } from "next/image";

import test1 from "@/shared/assets/png/projects/1.jpg";
import test2 from "@/shared/assets/png/projects/2.jpg";
import test3 from "@/shared/assets/png/projects/3.jpg";
import test4 from "@/shared/assets/png/projects/4.jpg";

export interface IProjects {
  id: number;
  tag: string;
  title: string;
  cover: StaticImageData;
  span?: "v2" | "h2" | "big" | undefined;
}

export const projects: IProjects[] = [
  {
    id: 1,
    tag: "UI",
    span: "big",
    cover: test1,
    title: "Brand System",
  },
  {
    id: 2,
    span: "v2",
    tag: "GSAP",
    cover: test2,
    title: "Motion Landing",
  },
  { id: 3, title: "E‑commerce", tag: "Web", cover: test3 },
  { id: 4, title: "3D Shot", tag: "3D", cover: test4 },
  { id: 5, title: "Mobile App", tag: "iOS", cover: test1 },
  { id: 6, title: "Illustrations", tag: "Art", cover: test2 },
  {
    id: 7,
    tag: "Web",
    span: "v2",
    cover: test3,
    title: "Promo Microsite",
  },
  { id: 8, title: "Flow Motion", tag: "GSAP", cover: test4 },
  { id: 9, title: "E‑commerce", tag: "Web", cover: test1 },
];
