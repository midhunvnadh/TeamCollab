import request from "@/lib/request";
import Link from "next/link";
import React from "react";
import { FaTrash } from "react-icons/fa";
import ProjectCard from "./ProjectCard";

export default function ProjectsView({ projects, refetch }) {
  return (
    <div className="">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects?.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={refetch}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
