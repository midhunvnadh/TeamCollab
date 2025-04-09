"use client";
import { use, useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import request from "@/lib/request";
import { PiArrowLeft } from "react-icons/pi";
import Link from "next/link";

export default function page({ params }) {
  const [tasks, setTasks] = useState([]);

  const { projectId } = use(params);

  const fetchTasks = async () => {
    const { data: tasks } = await request.get(`/projects/${projectId}/tasks`);
    setTasks(tasks);
  };

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  return (
    <div className="min-h-svh">
      <div className="p-2 bg-base-300">
        <div className="w-full">
          <Link href="/projects" className="flex items-center gap-2">
            <div>
              <PiArrowLeft />
            </div>
            <div>Project</div>
          </Link>
        </div>
      </div>
      <div className="lg:p-2 p-0 h-[calc(100vh-3rem)] overflow-y-auto lg:w-auto overflow-x-auto">
        <div className="grid grid-cols-3 grid-rows-1 lg:gap-3 lg:w-full w-[300vw] h-full">
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
        </div>
      </div>
    </div>
  );
}
