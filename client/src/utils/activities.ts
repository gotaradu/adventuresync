import { setActivitiesState } from "../context/activitiesSlice";
import { ipAddress } from "../context/config/ipAddreses";
import Activity from "../models/Activity";
import DrawedActivity from "../models/DrawedActivity";
import decode from "./decode";
import { EActivitiesState } from "./types";

export const handleNewData = (data: any): DrawedActivity[] => {
  return data.map((activity: Activity, index: number) => {
    const mapExists = !!activity.map.summary_polyline;

    const pointsa = mapExists
      ? decode(activity.map.summary_polyline).map((point) => ({
          lat: point.latitude,
          lng: point.longitude,
        }))
      : [];

    return {
      index,
      name: activity.name,
      mapExists,
      mapString: activity.map.summary_polyline,
      pointsa,
      distance: activity.distance,
      average_speed: activity.average_speed,
      sport_type: activity.sport_type,
      start_date: activity.start_date,
      location_country: activity.location_country,
      average_heartrate: activity.average_heartrate,
      max_heartrate: activity.max_heartrate,
      moving_time: activity.moving_time,
      elapsed_time: activity.elapsed_time,
      total_elevation_gain: activity.total_elevation_gain,
      elev_high: activity.elev_high,
      elev_low: activity.elev_low,
      start_latlng: activity.start_latlng,
    };
  });
};

export const fetchActivities = async (dispatch: any, page = 1) => {
  console.log(page);
  try {
    console.log(`Fetching page ${page} with 30 activities per page`);
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

    // await new Promise((resolve) => setTimeout(resolve, 5000));
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
