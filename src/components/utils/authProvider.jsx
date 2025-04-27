import { createContext, useContext, useEffect, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        setToken(storedToken);
        setUserRole(payload.role);
      } catch (error) {
        console.error("Error parsing token:", error); 
        logout(); 
      }
    }
  }, []);

  const login = (userToken, role) => {
    setToken(userToken);
    setUserRole(role);
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!token;

  return (
    <authContext.Provider value={{ token, login, logout, isAuthenticated, userRole }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an authProvider");
  }

  return context;
}
