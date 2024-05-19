import { useEffect, useState } from "react";
import CustomMap from "../components/CustomMap";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CenteredContent from "../components/CenteredContent";
import React from "react";
import Activity from "../models/Activity";
import decode from "../utils/decode";
import DrawedActivity from "../models/DrawedActivity";
import { ipAddress } from "../context/ipAddreses";

export const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, loading, checkAuth, setLoading } = useAuth();

  const [activities, setActivities] = useState<DrawedActivity[]>([]);
  const [color, setColor] = useState<number | null>(null);

  const updateLineColor = (index: number | null = null) => {
    if (index != null && activities[index].mapExists && index !== color) {
      setColor(index);
      console.log("changed color");
    } else if (index && !activities[index].mapExists) {
      console.log(index);
    }
  };

  const checkLocalStorage = async () => {
    console.log("from ls");
    setLoading(true);
    if (localStorage.getItem("activities") !== null) {
      console.log("first");
      const storageActivities = JSON.parse(
        localStorage.getItem("activities") as string
      );
      setActivities(storageActivities);
      return true;
    } else {
      return false;
    }
  };

  const fetchActivities = async () => {
    setLoading(true);
    console.log("from be");
    console.log(0);
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
        };
      });

      localStorage.setItem("activities", JSON.stringify(newData));
      setActivities(newData);
      console.log("saved");
      return data;
    } catch (error) {
      console.error("Alte erori:", error);
    }
  };

  const waitAuth = async () => {
    await checkAuth();
    const checked = await checkLocalStorage();
    setLoading(false);
    console.log(activities);
    if (!checked) {
      if (activities.length == 0) {
        await fetchActivities();
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    waitAuth();
  }, []);

  if (loading || isLoggedIn) {
    return (
      <React.Fragment>
        {loading ? (
          <CenteredContent>
            <CircularProgress />
          </CenteredContent>
        ) : (
          <CustomMap
            activities={activities}
            colorIndex={color}
            updateLineColor={updateLineColor}
          />
        )}
      </React.Fragment>
    );
  } else {
    navigate("/");
    return (
      <CenteredContent>
        <CircularProgress />
      </CenteredContent>
    );
  }
};

export default ActivitiesPage;
