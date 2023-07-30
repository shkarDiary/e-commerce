"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

type User = {
  token: string | null;
};

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ token: null });

  useEffect(() => {
    // Check if the token is already stored in the local storage (e.g., after page refresh)
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser({ token: storedToken });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Send login request to the server to get the authentication token
      const response = await axios.post("http://localhost:1337/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        const token = data.user; // Assuming the server returns the token in the response
        setUser({ token });

        // Store the token in the local storage
        localStorage.setItem("token", token);

        return response.status;
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    // Clear the token from the state and local storage
    setUser({ token: null });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
