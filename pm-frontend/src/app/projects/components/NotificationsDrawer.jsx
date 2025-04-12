import request from "@/lib/request";
import React from "react";

export default function NotificationsDrawer({ open, close }) {
  const [notifications, setNotifications] = React.useState([]);
  const fetchNotifications = async () => {
    const { data } = await request.get("/notifications");
    setNotifications(data);
  };
  React.useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <div>
      <div className="drawer drawer-end drawer-open">
        <div className="drawer-side">
          <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2 overflow-y-auto">
            {notifications?.map((n) => {
              return (
                <div
                  key={n.created_at}
                  className="alert alert-info shadow-lg rounded-sm"
                >
                  <p>
                    You have received a new task "{n.title}" on project "
                    {n.project_name}"!
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
