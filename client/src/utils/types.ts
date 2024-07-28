import DrawedActivity from "../models/DrawedActivity";
import { Map } from "leaflet";
import { Athlete } from "../models/Athlete";

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

export interface IUserContext {
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

export enum EAuthState {
  Visitor,
  Guest,
  User,
  Forbidden,
  Unauthorized,
  Error,
}
export enum EActivitiesState {
  Idle,
  Fetched,
  Loading,
  Error,
}
export interface IAuthState {
  authState: EAuthState;
  athlete: Athlete | undefined;
  message: string;
}

export interface IActivitiesState {
  activitiesState: EActivitiesState;
  activities: DrawedActivity[];
  selected: number;
}

export type ActivityState = {
  activity: DrawedActivity | null;
  altitudeStream: any | null;
  fetchError: string;
};
