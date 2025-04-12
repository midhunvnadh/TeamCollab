import React from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import request from "@/lib/request";

export default function ProjectCard({ project, onDelete }) {
  const createdAt = new Date(project.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      await request.delete(`/projects/${project.id}`);
      onDelete();
    }
  };

  return (
    <div key={project.id} className="card border border-gray-300 shadow-xs">
      <div className="card-body p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="card-title text-lg">{project.name}</h2>
            <div className="text-sm text-base-content/70">{createdAt}</div>
          </div>
          <div className="divider my-0"></div>
          <div className="flex items-center justify-end gap-2">
            <Link
              className="btn btn-primary btn-sm"
              href={`/projects/${project.id}`}
            >
              View Project
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-sm shadow-none btn-square text-white"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
