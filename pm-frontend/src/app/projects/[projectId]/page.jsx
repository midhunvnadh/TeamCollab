"use client";
import { use, useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import request from "@/lib/request";

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
          <div>Project</div>
        </div>
      </div>
      <div className="p-2 grid grid-cols-3 gap-3 h-[calc(100vh-3rem)] overflow-y-auto">
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
          const ts = tasks.filter((task) => task.status === list.tasksId);
          return (
            <div key={index}>
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
  );
}
