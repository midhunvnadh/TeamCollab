"use client";
import { use, useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import request from "@/lib/request";
import { PiArrowLeft } from "react-icons/pi";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export default function page({ params }) {
  const [tasks, setTasks] = useState([]);
  const [projectDetails, setProjectDetails] = useState(null);

  const { projectId } = use(params);

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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || !active) return;

    const activeId = active.id;

    if (active.data.current.status !== over.data.current.status) {
      updateTaskStatus(activeId, over.data.current.status);
    }
  };

  return (
    <div className="min-h-svh">
      <div className="p-2 bg-base-300">
        <div className="w-full">
          <Link href="/projects" className="flex items-center gap-2">
            <div>
              <PiArrowLeft />
            </div>
            <div>{projectDetails?.name || "Loading..."}</div>
          </Link>
        </div>
      </div>
      <div className="lg:p-2 p-0 h-[calc(100vh-3rem)] overflow-y-auto lg:w-auto overflow-x-auto">
        <div className="grid grid-cols-3 grid-rows-1 lg:gap-3 lg:w-full w-[300vw] h-full">
          <DndContext
            collisionDetection={closestCenter}
            onDragMove={handleDragEnd}
            sensors={sensors}
          >
            {[
              {
                name: "To Do",
                tasksId: 0,
              },
              {
                name: "In Progress",
                tasksId: 1,
              },
              {
                name: "Done",
                tasksId: 2,
              },
            ].map((list, index) => {
              const ts = tasks?.filter((task) => task.status === list.tasksId);
              return (
                <div key={index} className="lg:p-0 p-5">
                  <TaskList
                    listname={list.name}
                    tasks={ts}
                    tasksId={list.tasksId}
                    projectId={projectId}
                    refetch={fetchTasks}
                  />
                </div>
              );
            })}
          </DndContext>
        </div>
      </div>
    </div>
  );
}
