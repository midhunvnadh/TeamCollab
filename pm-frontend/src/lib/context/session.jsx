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
        setUser(data?.user || null);
      } else {
        setUser(null);
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

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      fetchUser();
    } catch (error) {
      console.error("Error logging out");
    }
  };

  return (
    <SessionContext.Provider value={{ user, loading, error, refetch, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};

export default SessionProvider;
