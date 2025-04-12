import request from "@/lib/request";
import React from "react";

export default function NotificationsDrawer({ open, close }) {
  const [notifications, setNotifications] = React.useState([]);
  const fetchNotifications = async () => {
    const { data } = await request.get("/notifications");
    setNotifications(data?.notifications || []);
  };
  React.useEffect(() => {
    fetchNotifications();
  }, []);
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
