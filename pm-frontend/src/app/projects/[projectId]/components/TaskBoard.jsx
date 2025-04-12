import React, { useEffect } from "react";
import TaskList from "./TaskList";
import { DndContext } from "@dnd-kit/core";
import { useTasks } from "@/lib/context/tasks";

export default function TaskBoard({ members }) {
  const { tasks, fetchTasks, updateTaskStatus } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const overStatus = Number(overId.split("-")[1]);
    updateTaskStatus(activeId, overStatus);
  };

  const tasksByStatus = {
    0: tasks?.filter((t) => t.status === 0) || [],
    1: tasks?.filter((t) => t.status === 1) || [],
    2: tasks?.filter((t) => t.status === 2) || [],
  };

  return (
    <div className="lg:p-4 p-2 grow h-[calc(100svh-3.5rem)] lg:w-full w-[300vw]">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4 h-full">
          <TaskList
            listname="To Do"
            tasks={tasksByStatus[0]}
            tasksId={0}
            members={members}
          />
          <TaskList
            listname="In Progress"
            tasks={tasksByStatus[1]}
            tasksId={1}
            members={members}
          />
          <TaskList
            listname="Done"
            tasks={tasksByStatus[2]}
            tasksId={2}
            members={members}
          />
        </div>
      </DndContext>
    </div>
  );
}
