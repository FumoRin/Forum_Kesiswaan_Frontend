import { createContext, useContext, useEffect, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage synchronously
  const initializeAuth = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        return {
          token: storedToken,
          userRole: payload.role,
          userSchool: payload.school
        };
      } catch (error) {
        console.error("Error parsing token:", error);
        localStorage.removeItem("token");
      }
    }
    return { token: null, userRole: null, userSchool: null };
  };

  // Initialize state synchronously to avoid the flash of unauthenticated state
  const initialAuth = initializeAuth();
  const [token, setToken] = useState(initialAuth.token);
  const [userRole, setUserRole] = useState(initialAuth.userRole);
  const [userSchool, setUserSchool] = useState(initialAuth.userSchool);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Just mark loading as complete after the initial render
    setLoading(false);
  }, []);

  const login = (userToken, role, school) => {
    setToken(userToken);
    setUserRole(role);
    setUserSchool(school);
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
    setUserSchool(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!token;

  return (
    <authContext.Provider value={{ token, login, logout, isAuthenticated, userRole, userSchool, loading }}>
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
