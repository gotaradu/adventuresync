import CustomMap from "../components/CustomMap";
import { ipAddress } from "../context/ipAddreses";
import { CircularProgress } from "@mui/material";
import CenteredContent from "../components/CenteredContent";
import React, { useEffect } from "react";
import Activity from "../models/Activity";
import { LatLng } from "leaflet";
import decode from "../utils/decode";
import { EActivitiesState, EAuthState } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { setActivitiesState } from "../context/activitiesSlice";

export const ActivitiesPage: React.FC = () => {
  const { authState } = useSelector((state: RootState) => state.auth);
  const { activitiesState, activities } = useSelector(
    (state: RootState) => state.activities
  );
  const dispatch = useDispatch();

  const fetchActivities = async () => {
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
        dispatch(
          setActivitiesState({
            activitiesState: EActivitiesState.Error,
            activities: [],
            selected: -1,
          })
        );
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
      dispatch(
        setActivitiesState({
          activitiesState: EActivitiesState.Fetched,
          activities: newData,
          selected: -1,
        })
      );
    } catch (error) {
      dispatch(
        setActivitiesState({
          activitiesState: EActivitiesState.Error,
          activities: [],
          selected: -1,
        })
      );
      console.error("Error fetching activities:", error);
    }
  };
  useEffect(() => {
    console.log(authState);
    if (
      activitiesState !== EActivitiesState.Fetched &&
      authState !== EAuthState.Guest
    )
      fetchActivities();
  }, []);

  const render = () => {
    if (
      authState === EAuthState.Guest ||
      (authState === EAuthState.User &&
        activitiesState === EActivitiesState.Fetched)
    )
      return <CustomMap />;
    else
      return (
        <CenteredContent>
          <CircularProgress />
        </CenteredContent>
      );
  };

  return render();
};

export default ActivitiesPage;
