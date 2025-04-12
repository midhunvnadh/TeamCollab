import React from "react";
import TaskListItem from "./TaskListItem";
import { useSession } from "@/lib/context/session";
import { useDroppable } from "@dnd-kit/core";
import { useTasks } from "@/lib/context/tasks";

export default function TaskList({ listname, tasks, tasksId, members }) {
  const [newTask, setNewTask] = React.useState("");
  const [assignToMe, setAssignToMe] = React.useState(false);
  const { loading, createTask } = useTasks();
  const { user } = useSession();

  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${tasksId}`,
    data: {
      status: tasksId,
    },
  });

  const handleCreateTask = async () => {
    const result = await createTask(
      newTask,
      tasksId,
      assignToMe ? user?.id : null
    );
    if (result) {
      setNewTask("");
    }
  };

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
      <div className="text-end">
        <textarea
          placeholder="Add a new task"
          className="textarea textarea-bordered w-full"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
        ></textarea>
        <div className="flex justify-between items-end">
          <div className="space-x-2">
            <input
              type="checkbox"
              className="checkbox checkbox-xs"
              checked={assignToMe}
              id={`${tasksId}-cb`}
              onChange={() => {
                setAssignToMe(!assignToMe);
              }}
            />
            <label htmlFor={`${tasksId}-cb`}>
              <span className="text-xs">Assign to Me</span>
            </label>
          </div>
          <div>
            <button
              className="btn btn-primary btn-xs shadow-none mt-2"
              onClick={handleCreateTask}
              disabled={loading || !newTask}
            >
              {loading ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                <span>Create Task</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
