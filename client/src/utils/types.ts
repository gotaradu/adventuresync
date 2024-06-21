import DrawedActivity from "../models/DrawedActivity";
import { Map } from "leaflet";
import Athlete from "../models/Athlete";
export type SelectedActivityContextType = {
  selectedActivity: number | null;
  setSelectedActivity: (index: number | null) => void;
};

export type DrawerType = {
  activities: DrawedActivity[];
  color: number | null;
  setColor: (index: number | null) => void;
};

export type ActivityType = {
  activity: DrawedActivity;
  index: number;
  map: Map;
  setColor: (index: number | null) => void;
};

export type CustomMarkersType = {
  activities: DrawedActivity[];
  setColor: (index: number | null) => void;
};

export interface UserContext {
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
