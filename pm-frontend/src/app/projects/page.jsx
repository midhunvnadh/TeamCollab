"use client";
import CreateNewProjectModal from "@/lib/components/CreateNewProjectModal";
import React, { useEffect } from "react";
import { FaBell, FaPlusCircle } from "react-icons/fa";
import ProjectsView from "./components/ProjectsView";
import request from "@/lib/request";
import NotificationsDrawer from "./components/NotificationsDrawer";
import { CiLogout } from "react-icons/ci";
import { useSession } from "@/lib/context/session";

export default function page() {
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [nd, setNd] = React.useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await request.get("/projects");
    setProjects(data?.projects || []);
    setLoading(false);
  };

  const { logout } = useSession();

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div className="px-4 lg:p-0">
      <div className="container mx-auto sticky top-5 mt-5">
        <div className="w-full p-2 bg-base-300 flex items-center justify-between rounded-md px-2">
          <div className="font-black tracking-wide">
            <h1>Projects</h1>
          </div>
          <div className="flex gap-2">
            <div>
              <button
                className="btn btn-ghost btn-sm shadow-none btn-circle"
                onClick={() => setNd(!nd)}
              >
                <span>
                  <FaBell className="text-sm" />
                </span>
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary btn-sm shadow-none"
                onClick={() => setShowModal(true)}
              >
                <span>
                  <FaPlusCircle className="text-sm" />
                </span>
                <span>New Project</span>
              </button>
            </div>
            <div>
              <button
                onClick={logout}
                className="btn btn-sm shadow-none btn-error"
              >
                <span>
                  <CiLogout strokeWidth={2} />
                </span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CreateNewProjectModal
          show={showModal}
          hide={() => {
            setShowModal(false);
          }}
          refetch={fetchProjects}
        />
      </div>
      <div className="container m-auto py-3">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <ProjectsView projects={projects} refetch={fetchProjects} />
        )}
      </div>
      <NotificationsDrawer open={nd} close={() => setNd(false)} />
    </div>
  );
}
