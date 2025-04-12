import React from "react";
import { FaBell, FaPlusCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useSession } from "@/lib/context/session";

export default function ProjectsHeader({ onShowModal, onShowNotifications }) {
  const { logout } = useSession();

  return (
    <div className="container mx-auto sticky top-5 mt-5">
      <div className="w-full p-2 bg-base-200 flex items-center justify-between rounded-md px-2">
        <div className="font-black tracking-wide">
          <h1>Projects</h1>
        </div>
        <div className="flex gap-2">
          <div>
            <button
              className="btn btn-ghost btn-sm shadow-none btn-circle"
              onClick={onShowNotifications}
            >
              <span>
                <FaBell className="text-sm" />
              </span>
            </button>
          </div>
          <div>
            <button
              className="btn btn-primary btn-sm shadow-none"
              onClick={onShowModal}
            >
              <span>
                <FaPlusCircle className="text-sm" />
              </span>
              <span>New Project</span>
            </button>
          </div>
          <div>
            <button
              onClick={logout}
              className="btn btn-sm shadow-none btn-error"
            >
              <span>
                <CiLogout strokeWidth={2} />
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
