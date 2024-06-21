import DrawedActivity from "../models/DrawedActivity";

interface ActivitiesContextType {
  activities: DrawedActivity[];
  setActivities: (value: DrawedActivity[]) => void;
  fetchActivities: () => void;
  setLocalStorage: (key: string, value: any, expiry: number) => void;
  getLocalStorage: (key: string) => string | null;
}

export default ActivitiesContextType;
