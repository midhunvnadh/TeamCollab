import React, { useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useTasks } from "@/lib/context/tasks";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { useSocket } from "../context/socket";

export default function TaskCommentsModal({ taskId, onClose }) {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { comments, addComment, deleteComment, fetchComments } = useTasks();

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      await addComment(taskId, newComment);
      setNewComment("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }
    try {
      await deleteComment(taskId, commentId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments(taskId);
  }, []);

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-lg">Task Comments</h3>
          </div>
          <div>
            <button
              className="btn btn-ghost btn-sm btn-circle text-xl"
              onClick={onClose}
            >
              <HiXMark />
            </button>
          </div>
        </div>
        <div className="py-4">
          <CommentList
            comments={comments}
            onDeleteComment={handleDeleteComment}
          />
          <CommentInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onSubmit={handleAddComment}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
