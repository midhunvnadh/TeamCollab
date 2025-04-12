import React from "react";
import { useSession } from "@/lib/context/session";
import moment from "moment";
import { HiTrash } from "react-icons/hi2";

export default function CommentList({ comments, onDeleteComment }) {
  const { user } = useSession();

  return (
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
                className="btn btn-ghost btn-xs btn-circle text-sm"
                onClick={() => onDeleteComment(comment.id)}
              >
                <HiTrash className="text-error" />
              </button>
            )}
          </div>
          <div className="chat-bubble">{comment.comment}</div>
        </div>
      ))}
      {comments.length === 0 && (
        <div className="text-xs text-gray-600">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
}
