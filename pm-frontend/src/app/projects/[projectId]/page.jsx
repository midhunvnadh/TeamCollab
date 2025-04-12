"use client";
import { use, useEffect, useState } from "react";
import request from "@/lib/request";
import ViewProjectModal from "@/lib/components/ViewProjectModal";
import ViewProjectTeamModal from "@/lib/components/ViewProjectTeam";
import ProjectHeader from "./components/ProjectHeader";
import TaskBoard from "./components/TaskBoard";
import { TaskProvider } from "@/lib/context/tasks";

export default function page({ params }) {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showProjectTeamModal, setShowProjectTeamModal] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const [members, setMembers] = useState([]);
  const { projectId } = use(params);

  const fetchMembers = async () => {
    const { data: members } = await request.get(
      `/projects/${projectId}/members`
    );
    setMembers(members?.members);
  };

  const fetchProjectDetails = async () => {
    const { data: pd } = await request.get(`/projects/${projectId}/`);
    setProjectDetails(pd?.project);
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
      fetchMembers();
    }
  }, [projectId]);

  const refetch = () => {
    fetchProjectDetails();
  };

  return (
    <div className="min-h-svh">
      <ViewProjectModal
        show={showProjectModal}
        project={projectDetails}
        hide={() => setShowProjectModal(false)}
        refetch={refetch}
      />
      <ViewProjectTeamModal
        show={showProjectTeamModal}
        projectId={projectDetails?.id}
        members={members}
        fetchMembers={fetchMembers}
        hide={() => setShowProjectTeamModal(false)}
        refetch={refetch}
      />
      <ProjectHeader
        projectDetails={projectDetails}
        onShowTeamModal={() => setShowProjectTeamModal(true)}
        onShowProjectModal={() => setShowProjectModal(true)}
      />
      <TaskProvider projectId={projectId}>
        <TaskBoard members={members} />
      </TaskProvider>
    </div>
  );
}
