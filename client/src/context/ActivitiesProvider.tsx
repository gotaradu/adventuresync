import {
  useState,
  useCallback,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { LatLng } from "leaflet";
import Activity from "../models/Activity";
import decode from "../utils/decode";
import DrawedActivity from "../models/DrawedActivity";
import { ipAddress } from "./ipAddreses";
import ActivitiesContextType from "./ActivitiesContextType";

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined
);
export const ActivitiesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activities, setActivities] = useState<DrawedActivity[]>([]);

  const setLocalStorage = useCallback(
    (key: string, value: any, expiry: number) => {
      const now = new Date();

      const items = {
        value: value,
        expiry: now.getTime() + expiry,
      };

      localStorage.setItem(key, JSON.stringify(items));
    },
    []
  );

  const getLocalStorage = useCallback((key: string) => {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }, []);

  const fetchActivities = useCallback(async () => {
    try {
      const response = await fetch(`${ipAddress}:8080/activities`, {
        method: "GET",
        headers: {
          Origin: `${ipAddress}:3000`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      const newData = data.map((activity: Activity, index: number) => {
        const mapExists = !!activity.map.summary_polyline;
        let start_ll = null;
        if (activity.start_latlng[0] && activity.start_latlng[1])
          start_ll = new LatLng(
            activity.start_latlng[0],
            activity.start_latlng[1]
          );

        const pointsa = mapExists
          ? decode(activity.map.summary_polyline).map((point) => ({
              lat: point.latitude,
              lng: point.longitude,
            }))
          : [];

        return {
          index,
          mapExists,
          mapString: activity.map.summary_polyline,
          pointsa,
          ...activity,
          start_ll,
        };
      });

      if (newData.length > 0)
        setLocalStorage("activities", JSON.stringify(newData), 600000);
      setActivities(newData);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  }, []);

  const value: ActivitiesContextType = {
    activities,
    setActivities,
    fetchActivities,
    setLocalStorage,
    getLocalStorage,
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
};
export const useActivities = () => {
  const context = useContext(ActivitiesContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
