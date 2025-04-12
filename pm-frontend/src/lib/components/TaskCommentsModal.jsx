import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/context/session";
import moment from "moment";
import { HiTrash, HiXMark } from "react-icons/hi2";
import { useTasks } from "@/lib/context/tasks";
import { FaPlaneSlash, FaRocket, FaRocketchat } from "react-icons/fa";

export default function TaskCommentsModal({ taskId, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSession();
  const { fetchComments, addComment, deleteComment } = useTasks();

  const loadComments = async () => {
    const comments = await fetchComments(taskId);
    setComments(comments);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      await addComment(taskId, newComment);
      setNewComment("");
      await loadComments();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(taskId, commentId);
      await loadComments();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [taskId]);

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
          <div className="space-y-4 mb-4 max-h-96 overflow-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="chat chat-start">
                <div className="chat-header mb-1">
                  @{comment.user}{" "}
                  <time className="text-xs opacity-50">
                    {moment(comment.created_at).fromNow()}
                  </time>
                  {user?.username === comment.user && (
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <HiTrash className="text-error" />
                    </button>
                  )}
                </div>
                <div className="chat-bubble">{comment.comment}</div>
              </div>
            ))}
          </div>
          <div className="form-control">
            <div className="input-group flex space-x-2">
              <input
                type="text"
                placeholder="Type your comment"
                className="input input-sm w-full"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAddComment();
                  }
                }}
              />
              <button
                className={`btn btn-sm ${loading ? "loading" : ""}`}
                onClick={handleAddComment}
                disabled={!newComment.trim() || loading}
              >
                <FaRocketchat />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
