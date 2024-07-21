import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { useNavigate, useParams } from "react-router-dom";
import DrawedActivity from "../models/DrawedActivity";
import { useEffect, useState } from "react";
import { EActivitiesState, EAuthState } from "../utils/types";
import { getAllActivities, handleNewData } from "../utils/activities";
import { setActivitiesState } from "../context/activitiesSlice";
import { mockActivities } from "../utils/mockData";
import { checkAuth } from "../utils/auth";
import CenteredContent from "../components/CenteredContent";
import { CircularProgress } from "@mui/material";

export const ActivityPage: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const { activities, activitiesState } = useSelector(
    (state: RootState) => state.activities
  );

  const { authState } = useSelector((state: RootState) => state.auth);
  const [activity, setActivity] = useState<DrawedActivity | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchActivitiesData = async () => {
      if (
        authState === EAuthState.Error ||
        activitiesState === EActivitiesState.Error ||
        authState === EAuthState.Forbidden ||
        authState === EAuthState.Unauthorized
      ) {
        navigate("/");
        return;
      }

      if (authState === EAuthState.User) {
        if (activitiesState !== EActivitiesState.Fetched) {
          await getAllActivities(dispatch);
        }
      } else if (
        authState === EAuthState.Visitor &&
        localStorage.getItem("visitor")
      ) {
        dispatch(
          setActivitiesState({
            activitiesState: EActivitiesState.Fetched,
            activities: handleNewData(mockActivities),
            selected: -1,
          })
        );
      } else if (authState === EAuthState.Guest) {
        await checkAuth(dispatch);
      }
    };

    fetchActivitiesData();
  }, [authState, activitiesState, dispatch, navigate]);

  useEffect(() => {
    const findActivity = () => {
      const foundActivity = activities.find(
        (activity) => activity.id === activityId
      );
      console.log("called");
      if (foundActivity) {
        setActivity(foundActivity);
      } else {
        navigate("/not-found");
      }
    };

    if (activitiesState === EActivitiesState.Fetched) {
      findActivity();
    }
  }, [activities, activitiesState, activityId, navigate]);

  if (
    (authState === EAuthState.User &&
      activitiesState !== EActivitiesState.Fetched) ||
    (authState === EAuthState.Visitor &&
      localStorage.getItem("visitor") &&
      activitiesState !== EActivitiesState.Fetched) ||
    (authState === EAuthState.Guest &&
      activitiesState !== EActivitiesState.Fetched)
  ) {
    return (
      <CenteredContent>
        <CircularProgress />
      </CenteredContent>
    );
  }

  return <div>{activity?.name}</div>;
};
