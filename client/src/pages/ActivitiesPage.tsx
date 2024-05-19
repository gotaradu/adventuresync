import { useEffect, useState } from "react";
import CustomMap from "../components/CustomMap";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CenteredContent from "../components/CenteredContent";
import React from "react";
import Activities from "../models/Activities";
import Activity from "../models/Activity";
import { LatLng } from "leaflet";
import decode from "../utils/decode";
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
  const [color, setColor] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLng>(new LatLng(50, 25));
  const [zooming, setZooming] = useState(false);
  const updateMapCenter = (newCenter: LatLng) => {
    setMapCenter(newCenter);
  };

  const updateLineColor = (index: number | null = null) => {
    if (index != null && activities[index].mapExists && index !== color) {
      setColor(index);
      console.log("changed color");
    } else if (index && !activities[index].mapExists) {
      console.log(index);
    }
  };

  const checkLocalStorage = async () => {
    setLoading(true);
    if (localStorage.getItem("activities") !== null && isLoggedIn) {
      const storageActivities = JSON.parse(
        localStorage.getItem("activities") as string
      );
      setActivities(storageActivities);
      return true;
    } else {
      localStorage.removeItem("activities");
      return false;
    }
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
            <CustomMap
              activities={activities}
              mapCenter={mapCenter}
              colorIndex={color}
              updateMapCenter={updateMapCenter}
              updateLineColor={updateLineColor}
              zooming={zooming}
              setZooming={setZooming}
            />
            <ActivityButton
              activities={activities}
              updateMapCenter={updateMapCenter}
              updateLineColor={updateLineColor}
              setZooming={setZooming}
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

export default ActivitiesPage;
