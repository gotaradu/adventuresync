import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

import UserContext from "./UserContext";
import Athlete from "../models/Athlete";
import { error } from "console";
const AuthContext = createContext<UserContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<"user" | "guest">("guest");
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://192.168.179.5:8080/home", {
        method: "GET",
        headers: {
          Origin: "http://192.168.179.5:3000",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("error when fetching");
      }
      const data: Athlete = await response.json();
      console.log(data);
      setLoggedIn(true);
      setRole("user");
      setAthlete(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Alte erori:", error);
    } finally {
      setLoading(false);
    }
  };

  const value: UserContext = {
    athlete,
    isLoggedIn,
    role,
    loading,
    setLoggedIn,
    setRole,
    checkAuth,
    setAthlete,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
