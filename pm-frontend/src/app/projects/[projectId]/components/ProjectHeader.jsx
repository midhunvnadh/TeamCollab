import { PiArrowLeft } from "react-icons/pi";
import { FaCog, FaUsers } from "react-icons/fa";
import Link from "next/link";

export default function ProjectHeader({
  projectDetails,
  onShowTeamModal,
  onShowProjectModal,
}) {
  return (
    <div className="p-2 bg-base-300">
      <div className="w-full flex justify-between items-center">
        <div>
          <Link href="/projects" className="flex items-center gap-2">
            <div className="btn btn-circle btn-ghost">
              <PiArrowLeft />
            </div>
            <div>{projectDetails?.name || "Loading..."}</div>
          </Link>
        </div>
        <div>
          <button
            className="btn btn-ghost btn-circle text-xl"
            onClick={onShowTeamModal}
          >
            <FaUsers />
          </button>
          <button
            className="btn btn-ghost text-primary btn-circle"
            onClick={onShowProjectModal}
          >
            <FaCog />
          </button>
        </div>
      </div>
    </div>
  );
}
