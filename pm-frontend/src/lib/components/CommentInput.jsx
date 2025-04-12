import React from "react";
import { FaRocketchat } from "react-icons/fa";

export default function CommentInput({ value, onChange, onSubmit, loading }) {
  return (
    <div className="form-control">
      <div className="input-group flex space-x-2">
        <input
          type="text"
          placeholder="Type your comment"
          className="input input-sm w-full"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
        />
        <button
          className={`btn btn-sm ${loading ? "loading" : ""}`}
          onClick={onSubmit}
          disabled={!value.trim() || loading}
        >
          <FaRocketchat />
        </button>
      </div>
    </div>
  );
}
