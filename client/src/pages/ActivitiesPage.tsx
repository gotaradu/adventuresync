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
import { LatLng } from "leaflet";

export const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, loading, checkAuth, setLoading } = useAuth();

  const [activities, setActivities] = useState<DrawedActivity[]>([]);

  const checkLocalStorage = async () => {
    setLoading(true);
    if (localStorage.getItem("activities") !== null) {
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
        console.log(activity.start_latlng);
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
    console.log("called");
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
          <CustomMap activities={activities} />
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
