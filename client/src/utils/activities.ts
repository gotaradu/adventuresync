import { setActivitiesState } from "../context/activitiesSlice";
import { ipAddress } from "../context/config/ipAddreses";
import Activity from "../models/Activity";
import DrawedActivity from "../models/DrawedActivity";
import decode from "./decode";
import { EActivitiesState } from "./types";

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
