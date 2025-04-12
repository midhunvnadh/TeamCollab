import request from "@/lib/request";
import moment from "moment";
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCommentsModal from "@/lib/components/TaskCommentsModal";
import TaskActions from "./TaskActions";
import TaskAssignment from "./TaskAssignment";

export default function TaskListItem({ task, projectId, refetch, members }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        status: task.status,
      },
      transition: {
        duration: 300,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });
  const [fadeLoading, setFadeLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const d = moment(task.created_at).format("dddd, MMMM Do YYYY");

  const deleteTask = async () => {
    try {
      setFadeLoading(true);
      await request.delete(`/projects/${projectId}/tasks/${task.id}`);
      await refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setFadeLoading(false);
    }
  };

  const assignChange = async (userId) => {
    setFadeLoading(true);
    try {
      const { data } = await request.patch(
        `/projects/${projectId}/tasks/${task.id}`,
        {
          assignTo: userId,
        }
      );
      if (!data.success) {
        alert(data.message);
        return;
      }
      refetch();
    } finally {
      setFadeLoading(false);
    }
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        className={`border rounded-lg border-base-200 bg-base-100 shadow p-2 ${
          fadeLoading ? "animate-pulse" : ""
        }`}
        draggable={true}
        {...attributes}
        {...listeners}
        style={style}
      >
        <div className="flex justify-between items-center border-b border-gray-200 pb-1 space-x-2">
          <TaskAssignment
            members={members}
            assignedUserId={task.assigned_to_user}
            onAssignChange={assignChange}
            disabled={fadeLoading}
          />
          <TaskActions
            onDelete={deleteTask}
            onShowComments={() => setShowComments(true)}
            fadeLoading={fadeLoading}
          />
        </div>
        <div className="min-h-14 py-2 text-sm font-medium">
          <h3>{task.title}</h3>
        </div>
        <div className="flex justify-end italic text-gray-400 items-end gap-2">
          <div className="text-xs">{d}</div>
        </div>
      </div>

      {showComments && (
        <TaskCommentsModal
          taskId={task.id}
          projectId={projectId}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
}
