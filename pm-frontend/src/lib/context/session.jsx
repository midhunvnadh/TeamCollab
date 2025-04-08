import { createContext, useEffect, useState, useContext } from "react";
import request from "../request";
const SessionContext = createContext("");

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await request.get("/auth/session");
      if (data.success) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refetch = fetchUser;

  return (
    <SessionContext.Provider value={{ user, loading, error, refetch }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};

export default SessionProvider;
