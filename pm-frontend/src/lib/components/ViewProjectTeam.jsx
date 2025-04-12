import React, { useEffect, useState } from "react";
import request from "../request";
import { FaTrash } from "react-icons/fa";
import { useSession } from "../context/session";
import { HiMiniXMark } from "react-icons/hi2";

export default function ViewProjectTeamModal({
  show,
  hide,
  members,
  fetchMembers,
  projectId,
}) {
  const [usernameToInvite, setusernameToInvite] = useState("");

  const setAdmin = async (username, admin) => {
    const { data: d } = await request.patch(
      `/projects/${projectId}/members/${username}`,
      {
        admin,
      }
    );
    if (!d.success) {
      alert("Something went wrong");
      return;
    }
    fetchMembers();
  };

  const deleteMember = async (username) => {
    const { data: d } = await request.delete(
      `/projects/${projectId}/members/${username}`
    );
    if (!d.success) {
      alert("Something went wrong");
      return;
    }
    fetchMembers();
  };

  const addNewMember = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!usernameToInvite) {
      alert("Please enter a username");
      return;
    }
    const { data: d } = await request.put(`/projects/${projectId}/members`, {
      username: usernameToInvite,
    });
    if (!d.success) {
      alert(d.message);
      return;
    }
    setusernameToInvite("");
    fetchMembers();
  };

  const { user } = useSession();

  const isTheLoggedInUserAdmin = members.find(
    (member) => member.username === user?.username
  )?.admin;

  return (
    <div>
      <dialog id="my_modal_4" className={`modal ${show ? "modal-open" : ""}`}>
        <div>
          <div className="modal-box w-sm lg:w-md max-w-5xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Project Members</h3>
              </div>
              <div>
                <button
                  className="btn btn-ghost btn-circle text-xl"
                  onClick={hide}
                >
                  <HiMiniXMark />
                </button>
              </div>
            </div>
            <div className="py-3">
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Admin</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members
                      ?.sort((a, b) => a.username.localeCompare(b.username))
                      ?.map((member, i) => {
                        return (
                          <tr key={member.id}>
                            <td>@{member.username}</td>

                            <td>
                              <input
                                type="checkbox"
                                className="checkbox checkbox-sm"
                                disabled={
                                  !isTheLoggedInUserAdmin ||
                                  user.username === member.username
                                }
                                defaultChecked={member.admin}
                                onClick={(e) => {
                                  setAdmin(member.username, e.target.checked);
                                }}
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-xs btn-error btn-square text-white"
                                disabled={
                                  member.username === "admin" || i === 0
                                }
                                onClick={async () => {
                                  await deleteMember(member.username);
                                }}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  {isTheLoggedInUserAdmin && (
                    <tfoot>
                      <tr>
                        <td colSpan={2}>
                          <div className="space-x-2">
                            <input
                              type="text"
                              name="username"
                              placeholder="Username"
                              className="input input-bordered input-sm w-full"
                              autoComplete="off"
                              value={usernameToInvite}
                              onChange={(e) =>
                                setusernameToInvite(e.target.value)
                              }
                            />
                            <button
                              className="btn btn-success btn-sm"
                              onClick={addNewMember}
                            >
                              Invite
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
