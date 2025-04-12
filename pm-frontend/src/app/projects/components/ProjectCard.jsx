import React from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import request from "@/lib/request";

export default function ProjectCard({ project, onDelete }) {
  return (
    <div
      key={project.id}
      className="card bg-base-200 shadow-xl border-2 border-base-300"
    >
      <div className="card-body p-2">
        <div className="flex items-center justify-between">
          <h2 className="card-title">{project.name}</h2>
          <div className="card-actions justify-end">
            <div>
              <Link
                className="btn btn-primary btn-sm"
                href={`/projects/${project.id}`}
              >
                View
              </Link>
            </div>
            <div>
              <button
                onClick={async () => {
                  await request.delete(`/projects/${project.id}`);
                  onDelete();
                }}
                className="btn btn-error btn-sm shadow-none btn-square"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
