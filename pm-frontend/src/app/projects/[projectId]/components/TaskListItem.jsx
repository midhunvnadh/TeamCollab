import request from "@/lib/request";
import moment from "moment";
import React, { useState } from "react";
import { PiTrashDuotone } from "react-icons/pi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskListItem({ task, projectId, refetch }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        status: task.status,
      },
      transition: {
        duration: 300, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });
  const [fadeLoading, setFadeLoading] = useState(false);
  const d = moment(task.created_at).format("dddd, MMMM Do YYYY");

  const deleteTask = async () => {
    try {
      setFadeLoading(true);
      await request.delete(`/projects/${projectId}/tasks/${task.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      await refetch();
      setFadeLoading(false);
    }
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={`border border-base-200 bg-base-100  p-2 ${
        fadeLoading ? "animate-pulse" : ""
      }`}
      draggable={true}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div>
        <h3>{task.title}</h3>
      </div>
      <div className="flex justify-between items-end gap-2">
        <div className="text-xs">{d}</div>
        <div>
          <button
            className="btn btn-error btn-xs btn-circle"
            onMouseUp={(e) => {
              e.stopPropagation();
              console.log("delete");
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
