import Link from "next/link";
import React from "react";

export default function ProjectsView({ projects }) {
  return (
    <div className="p-3">
      <div>
        <div>
          {projects?.map((project) => {
            return (
              <div key={project.id} className="card w-96 bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{project.name}</h2>
                  <p>{project.description}</p>
                  <div className="card-actions justify-end">
                    <Link
                      className="btn btn-primary"
                      href={`/projects/${project.id}`}
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
