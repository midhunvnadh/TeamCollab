import React, { useState } from "react";
import { useSession } from "@/lib/context/session";
import { useTasks } from "@/lib/context/tasks";

export default function CreateTaskForm({ tasksId, members }) {
  const [newTask, setNewTask] = useState("");
  const [assignToMe, setAssignToMe] = useState(false);
  const { loading, createTask } = useTasks();
  const { user } = useSession();

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
    <div>
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
  );
}
