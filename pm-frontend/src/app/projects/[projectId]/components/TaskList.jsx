import React from "react";
import TaskListItem from "./TaskListItem";
import request from "@/lib/request";
import { useSession } from "@/lib/context/session";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export default function TaskList({
  listname,
  tasks,
  tasksId,
  projectId,
  refetch,
  members,
}) {
  const [newTask, setNewTask] = React.useState("");
  const [assignToMe, setAssignToMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { user } = useSession();

  const { setNodeRef } = useDroppable({
    id: `droppable-${tasksId}`, // Each droppable area needs a unique ID
    data: {
      status: tasksId,
    },
  });

  const createNewTask = async () => {
    setLoading(true);
    const { data } = await request.put(`/projects/${projectId}/tasks`, {
      name: newTask,
      status: tasksId,
      assignTo: assignToMe ? user?.id : null,
    });
    if (data) {
      setNewTask("");
      refetch();
    }
    setLoading(false);
  };

  return (
    <div
      ref={setNodeRef}
      className="border-2 border-base-300 bg-base-200 rounded-lg p-2 h-full flex flex-col"
    >
      <div className="text-sm font-bold">{listname || "TaskList"}</div>
      <div className="divider my-0"></div>
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskListItem
                key={task.id}
                task={task}
                tasksId={tasksId}
                projectId={projectId}
                refetch={refetch}
                members={members}
              />
            ))
          ) : (
            <div className=" text-gray-500 text-xs">No tasks available</div>
          )}
        </div>
        <div className="grow">
          <div className="h-full overflow-auto"></div>
        </div>
      </SortableContext>
      <div className="divider my-0"></div>
      <div className="text-end">
        <textarea
          name=""
          id=""
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
              className="checkbox checkbox-sm"
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
              onClick={createNewTask}
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
