import React, { useEffect } from "react";
import TaskList from "./TaskList";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useTasks } from "@/lib/context/tasks";

export default function TaskBoard({ members }) {
  const { tasks, fetchTasks, updateTaskStatus } = useTasks();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.data.current.status;

    if (active.data.current.status !== newStatus) {
      updateTaskStatus(taskId, newStatus);
    }
  };

  const tasksByStatus = {
    0: tasks?.filter((t) => t.status === 0) || [],
    1: tasks?.filter((t) => t.status === 1) || [],
    2: tasks?.filter((t) => t.status === 2) || [],
  };

  return (
    <div className="lg:p-4 p-2 grow h-[calc(100svh-3.5rem)] overflow-x-auto">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 lg:gap-4 gap-7 h-full lg:w-full w-[300vw]">
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
