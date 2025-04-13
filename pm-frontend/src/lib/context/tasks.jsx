import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import request from "../request";
import { useSocket } from "./socket";

const TaskContext = createContext({});

export function TaskProvider({ children, projectId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();

  const fetchTasks = useCallback(async () => {
    try {
      const { data: tasks } = await request.get(`/projects/${projectId}/tasks`);
      setTasks(tasks?.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [projectId]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    // Listen for task updates
    socket.on("taskUpdate", ({ type, data }) => {
      fetchTasks();
    });

    return () => {
      socket.off("taskUpdate");
    };
  }, [socket, projectId, fetchTasks]);

  const createTask = useCallback(
    async (name, status, assignTo = null) => {
      setLoading(true);
      try {
        const { data } = await request.put(`/projects/${projectId}/tasks`, {
          name,
          status,
          assignTo,
        });
        if (data) {
          await fetchTasks();
        }
        return data;
      } catch (error) {
        console.error("Error creating task:", error);
      } finally {
        setLoading(false);
      }
    },
    [projectId, fetchTasks]
  );

  const updateTaskStatus = useCallback(
    async (taskId, newStatus) => {
      try {
        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, status: newStatus };
            }
            return task;
          });
          return updatedTasks;
        });

        await request.patch(`/projects/${projectId}/tasks/${taskId}`, {
          status: newStatus,
        });
      } catch (error) {
        console.error("Error updating task status:", error);
        // Revert optimistic update on error
        await fetchTasks();
      }
    },
    [projectId, fetchTasks]
  );

  const deleteTask = useCallback(
    async (taskId) => {
      try {
        await request.delete(`/projects/${projectId}/tasks/${taskId}`);
        await fetchTasks();
        return true;
      } catch (error) {
        console.error("Error deleting task:", error);
        return false;
      }
    },
    [projectId, fetchTasks]
  );

  const assignTask = useCallback(
    async (taskId, userId) => {
      try {
        const { data } = await request.patch(
          `/projects/${projectId}/tasks/${taskId}`,
          {
            assignTo: userId,
          }
        );
        if (!data.success) {
          throw new Error(data.message);
        }
        await fetchTasks();
        return true;
      } catch (error) {
        console.error("Error assigning task:", error);
        return false;
      }
    },
    [projectId, fetchTasks]
  );

  // Comments management
  const fetchComments = useCallback(
    async (taskId) => {
      try {
        const { data } = await request.get(
          `/projects/${projectId}/tasks/${taskId}/comments`
        );
        return data?.comments || [];
      } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
      }
    },
    [projectId]
  );

  const addComment = useCallback(
    async (taskId, comment) => {
      try {
        await request.put(`/projects/${projectId}/tasks/${taskId}/comments`, {
          comment,
        });
        return true;
      } catch (error) {
        console.error("Error adding comment:", error);
        return false;
      }
    },
    [projectId]
  );

  const deleteComment = useCallback(
    async (taskId, commentId) => {
      try {
        await request.delete(
          `/projects/${projectId}/tasks/${taskId}/comments/${commentId}`
        );
        return true;
      } catch (error) {
        console.error("Error deleting comment:", error);
        return false;
      }
    },
    [projectId]
  );

  // Team management
  const setMemberAdmin = useCallback(
    async (username, admin) => {
      try {
        const { data } = await request.patch(
          `/projects/${projectId}/members/${username}`,
          {
            admin,
          }
        );
        return data.success;
      } catch (error) {
        console.error("Error setting member admin status:", error);
        return false;
      }
    },
    [projectId]
  );

  const deleteMember = useCallback(
    async (username) => {
      try {
        const { data } = await request.delete(
          `/projects/${projectId}/members/${username}`
        );
        return data.success;
      } catch (error) {
        console.error("Error deleting member:", error);
        return false;
      }
    },
    [projectId]
  );

  const addMember = useCallback(
    async (username) => {
      try {
        const { data } = await request.put(`/projects/${projectId}/members`, {
          username,
        });
        return { success: data.success, message: data.message };
      } catch (error) {
        console.error("Error adding member:", error);
        return { success: false, message: error.message };
      }
    },
    [projectId]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        createTask,
        updateTaskStatus,
        deleteTask,
        assignTask,
        fetchComments,
        addComment,
        deleteComment,
        setMemberAdmin,
        deleteMember,
        addMember,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
