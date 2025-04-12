import React, { useEffect, useState } from "react";
import request from "@/lib/request";
import { useSession } from "@/lib/context/session";
import moment from "moment";

export default function TaskCommentsModal({ taskId, projectId, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const { data } = await request.get(
        `/projects/${projectId}/tasks/${taskId}/comments`
      );
      setComments(data?.comments);
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      await request.put(`/projects/${projectId}/tasks/${taskId}/comments`, {
        comment: newComment,
      });
      setNewComment("");
      await fetchComments();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment();
  };

  useEffect(() => {
    fetchComments();
  }, [taskId, projectId]);

  return (
    <dialog id="task_comments_modal" className="modal modal-open">
      <div className="modal-box w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Comments</h3>
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={onClose}
            >
              ✕
            </button>
          </form>
        </div>

        <div className="max-h-[60vh] overflow-y-auto mb-4">
          {comments.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No comments yet
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-base-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">@{comment.user}</span>
                    <span className="text-xs text-gray-500">
                      {moment(comment.created_at).fromNow()}
                    </span>
                  </div>
                  <p className="text-sm">{comment.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="input input-bordered w-full"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !newComment.trim()}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
