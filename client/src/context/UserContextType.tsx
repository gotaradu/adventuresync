import Athlete from "../models/Athlete";

interface UserContext {
  athlete: Athlete | null;
  isLoggedIn: boolean;
  role: "user" | "guest";
  loading: boolean;
  setLoggedIn: (value: boolean) => void;
  setRole: (value: "user" | "guest") => void;
  checkAuth: () => void;
  setAthlete: (value: Athlete) => void;
  setLoading: (value: boolean) => void;
}

export default UserContext;
