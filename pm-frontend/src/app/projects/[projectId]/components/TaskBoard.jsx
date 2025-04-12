import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import TaskList from "./TaskList";

export default function TaskBoard({
  tasks,
  projectId,
  members,
  onTaskMove,
  refetchTasks,
}) {
  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor, {
      distance: 0,
      delay: 0,
    }),
    useSensor(MouseSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;
    const activeId = active.id;
    if (active.data.current.status !== over.data.current.status) {
      onTaskMove(activeId, over.data.current.status);
    }
  };

  return (
    <div className="lg:p-2 p-0 h-[calc(100vh-3.5rem)] overflow-y-auto lg:w-auto overflow-x-auto">
      <div className="grid grid-cols-3 grid-rows-1 lg:gap-3 lg:w-full w-[300vw] h-full">
        <DndContext
          collisionDetection={closestCenter}
          onDragMove={handleDragEnd}
          sensors={sensors}
        >
          {[
            { name: "To Do", tasksId: 0 },
            { name: "In Progress", tasksId: 1 },
            { name: "Done", tasksId: 2 },
          ].map((list, index) => {
            const ts = tasks?.filter((task) => task.status === list.tasksId);
            return (
              <div key={index} className="lg:p-0 p-5">
                <TaskList
                  listname={list.name}
                  tasks={ts}
                  tasksId={list.tasksId}
                  projectId={projectId}
                  refetch={refetchTasks}
                  members={members}
                />
              </div>
            );
          })}
        </DndContext>
      </div>
    </div>
  );
}
