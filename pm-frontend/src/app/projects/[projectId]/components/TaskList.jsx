import React from "react";
import TaskListItem from "./TaskListItem";
import request from "@/lib/request";

export default function TaskList({
  listname,
  tasks,
  tasksId,
  projectId,
  refetch,
}) {
  const [newTask, setNewTask] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const createNewTask = async () => {
    setLoading(true);
    const { data } = await request.put(`/projects/${projectId}/tasks`, {
      name: newTask,
      status: tasksId,
    });
    if (data) {
      setNewTask("");
      refetch();
    }
    setLoading(false);
  };

  return (
    <div className="border-2 border-base-300 bg-base-200 rounded-lg p-2 h-full flex flex-col">
      <div className="text-sm font-bold">{listname || "TaskList"}</div>
      <div className="divider my-0"></div>
      <div>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskListItem key={index} task={task} tasksId={tasksId} />
          ))
        ) : (
          <div className=" text-gray-500 text-xs">No tasks available</div>
        )}
      </div>
      <div className="grow">
        <div className="h-full overflow-auto"></div>
      </div>
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
  );
}
