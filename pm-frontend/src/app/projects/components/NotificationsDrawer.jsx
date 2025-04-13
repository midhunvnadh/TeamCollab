import request from "@/lib/request";
import Link from "next/link";
import React from "react";
import { FaBell, FaDotCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { useSocket } from "@/lib/context/socket";

export default function NotificationsDrawer({ open, close }) {
  const [notifications, setNotifications] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { socket } = useSocket();

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const { data } = await request.get("/notifications");
      setNotifications(data?.tasks || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchNotifications();
    }
  }, [open]);

  React.useEffect(() => {
    if (!socket) return;

    socket.on("notification", ({ type, data }) => {
      fetchNotifications();
    });

    return () => {
      socket.off("notification");
    };
  }, [socket]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24)),
      "day"
    );
  };

  return (
    <div>
      <div className="drawer drawer-end">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={open}
          onChange={close}
        />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-base-200 text-base-content min-h-full w-96 p-0">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-base-200 px-4 py-3 border-b border-base-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>
                  <FaBell className="text-md" />
                </span>
                <h2 className="text-lg font-semibold">Notifications</h2>
              </div>
              <button
                onClick={close}
                className="btn btn-ghost btn-sm btn-circle text-2xl"
              >
                <HiXMark />
              </button>
            </div>

            <div className="px-4 py-2 space-y-2 overflow-y-auto max-h-[calc(100vh-4rem)]">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-base-content/70">
                  <FaDotCircle />
                  <p className="text-sm font-medium">No new notifications</p>
                </div>
              ) : (
                notifications?.map((n) => (
                  <Link
                    href={`/projects/${n.project_id}`}
                    key={n.created_at}
                    className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-base-300"
                  >
                    <div className="card-body p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-info mt-2 flex-shrink-0" />
                        <div className="space-y-1 flex-grow">
                          <p className="font-medium">
                            New task assigned: "{n.title}"
                          </p>
                          <p className="text-sm text-base-content/70">
                            Project: {n.project_name}
                          </p>
                          <p className="text-xs text-base-content/60 capitalize">
                            {formatDate(n.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
