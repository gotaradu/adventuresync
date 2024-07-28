
import { LatLng } from "leaflet";
import { setActivitiesState } from "../context/activitiesSlice";
import { ipAddress } from "../context/config/ipAddreses";
import Activity from "../models/Activity";
import DrawedActivity from "../models/DrawedActivity";
import decode from "./decode";
import { ActivityState, EActivitiesState, EAuthState } from "./types";
import { NavigateFunction } from "react-router-dom";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { checkAuth } from "./auth";

const transformDistance = (distance: number) => parseFloat((distance / 1000).toFixed(2));

const transformTime = (time: number) => {
  return (
    (Math.floor(time / 3600) < 10
      ? "0" + Math.floor(time / 3600)
      : Math.floor(time / 3600)) +
    ":" +
    (Math.floor((time % 3600) / 60) < 10
      ? "0" + Math.floor((time % 3600) / 60)
      : Math.floor((time % 3600) / 60)) +
    ":" +
    (Math.floor(time % 60) < 10
      ? "0" + Math.floor(time % 60)
      : Math.floor(time % 60))
  );
};

const transformPace = (speed: number) => {
  if (speed > 0)
    return (
      (Math.floor(((1000 / speed) % 3600) / 60) < 10
        ? "0" + Math.floor(((1000 / speed) % 3600) / 60)
        : Math.floor(((1000 / speed) % 3600) / 60)) +
      ":" +
      (Math.floor((1000 / speed) % 60) < 10
        ? "0" + Math.floor((1000 / speed) % 60)
        : Math.floor((1000 / speed) % 60))
    )
  else return ""
};

const handleNewDataLocal = (activity: Activity): DrawedActivity => {
  const mapExists = !!activity.map;
  const pointsa = mapExists
    ? decode(activity.map).map((point) => new LatLng(
      point.latitude,
      point.longitude,
    ))
    : [];

  return {
    id: activity.id,
    athleteId: activity.athleteId,
    name: activity.name,
    mapExists,
    index: 0,
    mapString: activity.map,
    pointsa,
    distance: transformDistance(activity.distance),
    averageSpeed: transformPace(activity.averageSpeed),
    sportType: activity.sportType,
    startDate: activity.startDate,
    averageHeartRate: activity.averageHeartRate,
    maxHeartRate: activity.maxHeartRate,
    elapsedTime: transformTime(activity.elapsedTime),
    totalElevationGain: activity.totalElevationGain,
    elevHigh: activity.elevHigh,
    elevLow: activity.elevLow,
    startLatLng: activity.startLatLng,
  };
}
export const handleNewData = (data: any): DrawedActivity[] => {
  return data.map((activity: Activity, index: number) => {
    const mapExists = !!activity.map;
    const pointsa = mapExists
      ? decode(activity.map).map((point) => ({
        lat: point.latitude,
        lng: point.longitude,
      }))
      : [];

    return {
      id: activity.id,
      athleteId: activity.athleteId,
      index,
      name: activity.name,
      mapExists,
      mapString: activity.map,
      pointsa,
      distance: transformDistance(activity.distance),
      averageSpeed: transformPace(activity.averageSpeed),
      sportType: activity.sportType,
      startDate: activity.startDate,
      averageHeartRate: activity.averageHeartRate,
      maxHeartRate: activity.maxHeartRate,
      elapsedTime: transformTime(activity.elapsedTime),
      totalElevationGain: activity.totalElevationGain,
      elevHigh: activity.elevHigh,
      elevLow: activity.elevLow,
      startLatLng: activity.startLatLng,
    };
  });
};

export const fetchActivities = async (dispatch: any, page = 1) => {
  try {

    const response = await fetch(`${ipAddress}:8080/activities?page=${page}`, {
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
    console.log(data);
    return data;
  } catch (error) {
    dispatch(
      setActivitiesState({
        activitiesState: EActivitiesState.Error,
        activities: [],
        selected: -1,
      })
    );
    console.error("Error fetching activities:", error);
    return [];
  }
};

export const getAllActivities = async (dispatch: any) => {
  let allActivities: DrawedActivity[] = [];
  let page = 1;
  const perPage = 50;
  let activities: Activity[];

  do {
    activities = await fetchActivities(dispatch, page);

    const newActivities = handleNewData(activities);

    allActivities = [...allActivities, ...newActivities];

    dispatch(
      setActivitiesState({
        activitiesState: EActivitiesState.Fetched,
        activities: allActivities,
        selected: -1,
      })
    );
    page++;
  } while (activities.length === perPage);
};

export const getSingleActivity = async (activityId: string | undefined) => {
  const response = await fetch(`${ipAddress}:8080/activities/activity?activityId=${activityId}`, {
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
  return handleNewDataLocal(data);
}

export const getAltitude = async (activityId: string | undefined) => {
  const response = await fetch(`${ipAddress}:8080/activities/stream/activity?activityId=${activityId}`, {
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
  return data;
}

export const handleAllActivities = async (authState: EAuthState, activitiesState: EActivitiesState, navigate: NavigateFunction, dispatch: Dispatch<UnknownAction>) => {
  if (
    authState === EAuthState.Error ||
    activitiesState === EActivitiesState.Error ||
    authState === EAuthState.Forbidden ||
    authState === EAuthState.Unauthorized
  )
    navigate("/");
  if (authState === EAuthState.User) {
    if (activitiesState !== EActivitiesState.Fetched) {
      await getAllActivities(dispatch);
    }
    return;
  }

  if (authState === EAuthState.Guest) {
    await checkAuth(dispatch);
    return;
  }
};

export const handleSingleActivity = async (authState: EAuthState, navigate: NavigateFunction, activityId: string | undefined, dispatch: Dispatch<UnknownAction>, useCustomState: React.Dispatch<React.SetStateAction<ActivityState>>) => {
  if (
    authState === EAuthState.Error ||
    authState === EAuthState.Forbidden ||
    authState === EAuthState.Unauthorized
  ) {
    navigate("/");
    return;
  }

  if (authState === EAuthState.User) {
    try {
      const apiActivity = await getSingleActivity(activityId);
      const altitudeStreamData = await getAltitude(activityId);
      useCustomState((prevState) => ({
        ...prevState,
        activity: apiActivity,
        altitudeStream: altitudeStreamData,
        fetchError: "",
      }));
    } catch (error) {
      useCustomState((prevState) => ({
        ...prevState,
        fetchError: "Resource not found",
      }));
    }
  } else if (authState === EAuthState.Guest) {
    await checkAuth(dispatch);
  }
}