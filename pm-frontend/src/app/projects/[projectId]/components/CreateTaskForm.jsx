import React, { useState } from "react";
import { useSession } from "@/lib/context/session";
import { useTasks } from "@/lib/context/tasks";

export default function CreateTaskForm({ tasksId, members }) {
  const [newTask, setNewTask] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const { loading, createTask } = useTasks();
  const { user } = useSession();

  const handleCreateTask = async () => {
    const result = await createTask(newTask, tasksId, assignedUser || null);
    if (result) {
      setNewTask("");
      setAssignedUser("");
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
        <div className="space-y-2">
          <select
            value={assignedUser || ""}
            onChange={(e) => setAssignedUser(e.target.value)}
            className="select select-bordered select-xs w-full"
          >
            <option value="">Unassigned</option>
            {members?.map((m) => (
              <option key={m.id} value={m.id}>
                @{m.username}
              </option>
            ))}
          </select>
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
