import { setActivitiesState } from "../context/activitiesSlice";
import { ipAddress } from "../context/ipAddreses";
import Activity from "../models/Activity";
import decode from "./decode";
import { EActivitiesState } from "./types";

export const fetchActivities = async (dispatch: any) => {
  console.log("called ac");
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
