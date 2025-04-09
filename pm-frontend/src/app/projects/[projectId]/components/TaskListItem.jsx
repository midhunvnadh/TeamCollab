import moment from "moment";
import React from "react";
import { PiTrashDuotone } from "react-icons/pi";

export default function TaskListItem({ task }) {
  const d = moment(task.created_at).format("dddd, MMMM Do YYYY");
  return (
    <div className="border border-base-200 bg-base-100 p-2">
      <div>
        <h3>{task.title}</h3>
      </div>
      <div className="flex justify-between items-end gap-2">
        <div className="text-xs">{d}</div>
        <div>
          <button className="btn btn-error btn-xs btn-circle">
            <PiTrashDuotone />
          </button>
        </div>
      </div>
    </div>
  );
}
