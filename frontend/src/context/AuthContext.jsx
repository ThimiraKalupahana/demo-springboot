import { createContext, useContext, useState } from "react";
import * as authApi from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const login = async (usernameInput, password) => {
    const { data } = await authApi.login(usernameInput, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    setUsername(data.username);
  };

  const signup = async (usernameInput, password) => {
    const { data } = await authApi.signup(usernameInput, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    setUsername(data.username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
