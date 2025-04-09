import request from "@/lib/request";
import moment from "moment";
import React, { useState } from "react";
import { PiTrashDuotone } from "react-icons/pi";

export default function TaskListItem({ task, projectId, refetch }) {
  const [fadeLoading, setFadeLoading] = useState(false);
  const d = moment(task.created_at).format("dddd, MMMM Do YYYY");
  const deleteTask = async () => {
    try {
      setFadeLoading(true);
      await request.delete(`/projects/${projectId}/tasks/${task.id}`);
    } finally {
      await refetch();
      setFadeLoading(false);
    }
  };
  return (
    <div
      className={`border border-base-200 bg-base-100 p-2 ${
        fadeLoading ? "animate-pulse" : ""
      }`}
    >
      <div>
        <h3>{task.title}</h3>
      </div>
      <div className="flex justify-between items-end gap-2">
        <div className="text-xs">{d}</div>
        <div>
          <button
            className="btn btn-error btn-xs btn-circle"
            onClick={() => {
              deleteTask();
            }}
          >
            {fadeLoading ? (
              <span className="loading loading-xs"></span>
            ) : (
              <PiTrashDuotone />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
