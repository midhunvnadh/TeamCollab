import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    );
    setSocket(socketInstance);

    return () => {
      socketInstance.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (socket === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};
