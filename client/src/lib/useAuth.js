import React, { useContext, createContext, useState, useCallback, useEffect } from "react";

// Dummy AuthContext for demonstration. Replace with your real auth logic.
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

// Optionally, export AuthProvider for real usage
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Persist auth state in localStorage
    return localStorage.getItem("isAuthenticated") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const login = useCallback((/* credentials */) => {
    setIsAuthenticated(true); // Accept any credentials
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  // Use React.createElement to avoid JSX in .js file
  return React.createElement(
    AuthContext.Provider,
    { value: { isAuthenticated, login, logout } },
    children
  );
}
