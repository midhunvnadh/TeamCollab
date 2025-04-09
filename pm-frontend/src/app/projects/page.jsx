import React from "react";
import { FaPlusCircle } from "react-icons/fa";

export default function page() {
  return (
    <div className="sticky top-5">
      <div className="container mx-auto">
        <div className="w-full p-2 bg-base-300 flex items-center justify-between rounded-xl px-2">
          <div className="">
            <h1>Projects</h1>
          </div>
          <div>
            <button className="btn btn-primary btn-xs shadow-none">
              <span>
                <FaPlusCircle className="text-sm" />
              </span>
              <span>New Project</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
