"use client";
import { use, useEffect, useState } from "react";
import request from "@/lib/request";
import ViewProjectModal from "@/lib/components/ViewProjectModal";
import ViewProjectTeamModal from "@/lib/components/ViewProjectTeam";
import ProjectHeader from "./components/ProjectHeader";
import TaskBoard from "./components/TaskBoard";

export default function page({ params }) {
  const [tasks, setTasks] = useState([]);
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

  const fetchTasks = async () => {
    const { data: tasks } = await request.get(`/projects/${projectId}/tasks`);
    setTasks(tasks);
  };

  const fetchProjectDetails = async () => {
    const { data: pd } = await request.get(`/projects/${projectId}/`);
    setProjectDetails(pd?.project);
  };

  useEffect(() => {
    if (projectId) {
      fetchTasks();
      fetchProjectDetails();
      fetchMembers();
    }
  }, [projectId]);

  var moveTimer = null;

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      if (moveTimer) clearTimeout(moveTimer);
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, status: newStatus };
          }
          return task;
        });
        return updatedTasks;
      });
      moveTimer = setTimeout(async () => {
        await request.patch(`/projects/${projectId}/tasks/${taskId}`, {
          status: newStatus,
        });
        fetchTasks();
      }, 500);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const refetch = () => {
    fetchTasks();
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
      <TaskBoard
        tasks={tasks}
        projectId={projectId}
        members={members}
        onTaskMove={updateTaskStatus}
        refetchTasks={fetchTasks}
      />
    </div>
  );
}
