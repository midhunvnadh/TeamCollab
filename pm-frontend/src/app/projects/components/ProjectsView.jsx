import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectsView({ projects, refetch }) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} onDelete={refetch} />
        ))}
      </div>
    </div>
  );
}
