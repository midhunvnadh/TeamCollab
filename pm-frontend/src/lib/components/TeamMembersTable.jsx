import { FaTrash } from "react-icons/fa";
import { useSession } from "../context/session";
import { useTasks } from "../context/tasks";
import { useState } from "react";

export default function TeamMembersTable({
  members,
  onMemberDelete,
  onSetAdmin,
  onAddMember,
  isAdmin,
}) {
  const [usernameToInvite, setusernameToInvite] = useState("");
  const { user } = useSession();

  const handleAddNewMember = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!usernameToInvite) {
      alert("Please enter a username");
      return;
    }
    await onAddMember(usernameToInvite);
    setusernameToInvite("");
  };

  return (
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
            ?.map((member, i) => (
              <tr key={member.id}>
                <td>@{member.username}</td>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    disabled={!isAdmin || user.username === member.username}
                    defaultChecked={member.admin}
                    onClick={(e) =>
                      onSetAdmin(member.username, e.target.checked)
                    }
                  />
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-error btn-square text-white"
                    disabled={member.username === "admin" || i === 0}
                    onClick={() => onMemberDelete(member.username)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
        {isAdmin && (
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
                    onChange={(e) => setusernameToInvite(e.target.value)}
                  />
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleAddNewMember}
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
  );
}
