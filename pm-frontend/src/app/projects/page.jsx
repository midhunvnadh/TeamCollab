"use client";
import React, { useEffect } from "react";
import request from "@/lib/request";
import CreateNewProjectModal from "@/lib/components/CreateNewProjectModal";
import ProjectsView from "./components/ProjectsView";
import NotificationsDrawer from "./components/NotificationsDrawer";
import ProjectsHeader from "./components/ProjectsHeader";

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

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="px-4 lg:p-0">
      <ProjectsHeader
        onShowModal={() => setShowModal(true)}
        onShowNotifications={() => setNd(!nd)}
      />
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
