import { useEffect, useState } from "react";
import CustomMap from "../components/CustomMap";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CenteredContent from "../components/CenteredContent";
import React from "react";
import Activities from "../models/Activities";
import Activity from "../models/Activity";

import decode from "../utils/decode";
import StravaPoint from "../models/StravaPoint";
import DrawedActivity from "../models/DrawedActivity";
import { ActivityButton } from "../components/ActivityButton";
import { ipAddress } from "../context/ipAddreses";

export const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    athlete,
    isLoggedIn,
    role,
    loading,
    setLoggedIn,
    setRole,
    setAthlete,
    checkAuth,
    setLoading,
  } = useAuth();

  const [activities, setActivities] = useState<DrawedActivity[]>([]);

  const [mapCenter, setMapCenter] = useState<StravaPoint>({
    latitude: 50,
    longitude: 25,
  });

  const updateMapCenter = (newCenter: StravaPoint) => {
    setMapCenter(newCenter);
  };

  const checkLocalStorage = async () => {
    setLoading(true);
    if (localStorage.getItem("activities") !== null) {
      const storageActivities = JSON.parse(
        localStorage.getItem("activities") as string
      );
      setActivities(storageActivities);
      return true;
    } else return false;
  };

  const fetchActivities = async () => {
    setLoading(true);
    console.log("called");
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

      const data: Activities = await response.json();

      const newData: DrawedActivity[] = [];
      if (Array.isArray(data)) {
        data.map((activity: Activity, index) => {
          if (activity.map.summary_polyline) {
            const decodedPolyline: StravaPoint[] = decode(
              activity.map.summary_polyline
            ).map((point) => ({
              latitude: point.latitude,
              longitude: point.longitude, // [[lat,lon] ,[lat, lon]]
            }));
            const drawedActivity: DrawedActivity = {
              mapExists: true,
              mapString: activity.map.summary_polyline,
              pointsa: decodedPolyline,
              ...activity,
            };
            newData.push(drawedActivity);
          } else {
            const drawedActivity: DrawedActivity = {
              mapExists: false,
              mapString: activity.map.summary_polyline,
              pointsa: [],
              ...activity,
            };
            newData.push(drawedActivity);
          }
        });
      }
      localStorage.setItem("activities", JSON.stringify(newData));
      setActivities(newData);

      return data;
    } catch (error) {
      console.error("Alte erori:", error);
    }
  };

  const waitAuth = async () => {
    await checkAuth();
    const checked = await checkLocalStorage();
    setLoading(false);

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
          <React.Fragment>
            <CustomMap activities={activities} mapCenter={mapCenter} />
            <ActivityButton
              activities={activities}
              updateMapCenter={updateMapCenter}
            />
          </React.Fragment>
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
