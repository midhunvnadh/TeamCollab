import React from "react";
import { useSession } from "../context/session";
import { HiMiniXMark } from "react-icons/hi2";
import { useTasks } from "../context/tasks";
import TeamMembersTable from "./TeamMembersTable";

export default function ViewProjectTeamModal({
  show,
  hide,
  members,
  fetchMembers,
}) {
  const { setMemberAdmin, deleteMember, addMember } = useTasks();
  const { user } = useSession();

  const handleSetAdmin = async (username, admin) => {
    const success = await setMemberAdmin(username, admin);
    if (!success) {
      alert("Something went wrong");
      return;
    }
    fetchMembers();
  };

  const handleDeleteMember = async (username) => {
    if (
      !confirm(
        "Are you sure you want to remove this team member from the project?"
      )
    ) {
      return;
    }
    const success = await deleteMember(username);
    if (!success) {
      alert("Something went wrong");
      return;
    }
    fetchMembers();
  };

  const handleAddMember = async (username) => {
    console.log(username, addMember);
    const { success, message } = await addMember(username);
    if (!success) {
      alert(message || "Something went wrong");
      return;
    }
    fetchMembers();
  };

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
              <TeamMembersTable
                members={members}
                onMemberDelete={handleDeleteMember}
                onSetAdmin={handleSetAdmin}
                onAddMember={handleAddMember}
                isAdmin={isTheLoggedInUserAdmin}
              />
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
