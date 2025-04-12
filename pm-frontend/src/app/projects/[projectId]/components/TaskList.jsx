import React from "react";
import TaskListItem from "./TaskListItem";
import { useDroppable } from "@dnd-kit/core";
import CreateTaskForm from "./CreateTaskForm";

export default function TaskList({ listname, tasks, tasksId, members }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${tasksId}`,
    data: {
      status: tasksId,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`border-2 ${
        isOver ? "border-primary" : "border-base-300"
      } bg-base-200 rounded-lg p-2 h-full flex flex-col`}
    >
      <div className="text-sm font-bold">{listname || "TaskList"}</div>
      <div className="divider my-0"></div>
      <div className="grow overflow-visible">
        <div className="space-y-2">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskListItem key={task.id} task={task} members={members} />
            ))
          ) : (
            <div className="text-gray-500 text-xs">No tasks available</div>
          )}
        </div>
      </div>
      <div className="divider my-0"></div>
      <CreateTaskForm tasksId={tasksId} members={members} />
    </div>
  );
}
