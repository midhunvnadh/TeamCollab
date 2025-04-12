import { FaComments } from "react-icons/fa";
import { PiTrashDuotone } from "react-icons/pi";

export default function TaskActions({ onDelete, onShowComments, fadeLoading }) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-info btn-xs btn-square text-white"
        onMouseUp={(e) => {
          e.stopPropagation();
          onShowComments();
        }}
      >
        <FaComments />
      </button>
      <button
        className="btn btn-error btn-xs btn-square text-white"
        onMouseUp={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        {fadeLoading ? (
          <span className="loading loading-xs"></span>
        ) : (
          <PiTrashDuotone />
        )}
      </button>
    </div>
  );
}
