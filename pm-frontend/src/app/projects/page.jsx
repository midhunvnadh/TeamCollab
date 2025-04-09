"use client";
import CreateNewProjectModal from "@/lib/components/CreateNewProjectModal";
import React, { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import ProjectsView from "./components/ProjectsView";
import request from "@/lib/request";

export default function page() {
  const [showModal, setShowModal] = React.useState(false);
  const [projects, setProjects] = React.useState([]);

  const fetchProjects = async () => {
    const { data } = await request.get("/projects");
    setProjects(data?.projects || []);
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div className="sticky top-5">
      <div className="container mx-auto">
        <div className="w-full p-2 bg-base-300 flex items-center justify-between rounded-xl px-2">
          <div className="">
            <h1>Projects</h1>
          </div>
          <div>
            <button
              className="btn btn-primary btn-xs shadow-none"
              onClick={() => setShowModal(true)}
            >
              <span>
                <FaPlusCircle className="text-sm" />
              </span>
              <span>New Project</span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <CreateNewProjectModal
          show={showModal}
          hide={() => {
            setShowModal(false);
          }}
        />
      </div>
      <div>
        <ProjectsView projects={projects} />
      </div>
    </div>
  );
}
