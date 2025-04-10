import React, { useEffect, useState } from "react";
import request from "../request";
import { FaTrash } from "react-icons/fa";

export default function ViewProjectTeamModal({
  show,
  hide,
  refetch,
  projectId,
}) {
  const [members, setMembers] = useState([]);
  const [usernameToInvite, setusernameToInvite] = useState("");

  const fetchMembers = async () => {
    const { data: members } = await request.get(
      `/projects/${projectId}/members`
    );
    setMembers(members?.members);
  };

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

  useEffect(() => {
    if (projectId && show) {
      fetchMembers();
    }
  }, [projectId, show]);

  return (
    <div>
      <dialog id="my_modal_4" className={`modal ${show ? "modal-open" : ""}`}>
        <div>
          <div className="modal-box w-md max-w-5xl">
            <h3 className="font-bold text-lg">Project Members</h3>
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
                                className="checkbox"
                                checked={member.admin}
                                onClick={(e) => {
                                  setAdmin(member.username, e.target.checked);
                                }}
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-xs btn-error btn-square"
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
                  <tfoot>
                    <tr>
                      <td colSpan={2}>
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
                          className="input input-bordered input-sm w-full"
                          autoComplete="off"
                          value={usernameToInvite}
                          onChange={(e) => setusernameToInvite(e.target.value)}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={addNewMember}
                        >
                          Invite
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="modal-action">
              <div className="space-x-2">
                <button className="btn btn-success btn-sm" type="submit">
                  Submit
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  type="button"
                  onClick={hide}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
