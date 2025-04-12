export default function TaskAssignment({
  members,
  assignedUserId,
  onAssignChange,
  disabled,
}) {
  return (
    <div className="flex items-center gap-2 justify-between grow">
      <span className="text-xs italic text-gray-400">Assigned to</span>
      <span>
        <select
          disabled={disabled}
          onChange={(e) => onAssignChange(e.target.value)}
          value={assignedUserId || ""}
          className="select select-bordered select-xs"
        >
          {!assignedUserId && <option value={""}>Select a user</option>}
          {members.map((m) => (
            <option value={m.id} key={m.id}>
              @{m.username}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}
