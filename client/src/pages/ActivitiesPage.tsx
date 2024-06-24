import CustomMap from "../components/CustomMap";
import { CircularProgress } from "@mui/material";
import CenteredContent from "../components/CenteredContent";
import React, { useEffect } from "react";
import { EActivitiesState, EAuthState } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { checkAuth } from "../utils/auth";
import { fetchActivities, handleNewData } from "../utils/activities";
import { useNavigate } from "react-router-dom";
import { setActivitiesState } from "../context/activitiesSlice";
import { mockActivities } from "../utils/mockData";

export const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useSelector((state: RootState) => state.auth);
  const { activitiesState } = useSelector(
    (state: RootState) => state.activities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(authState);
    if (authState !== EAuthState.Visitor && !localStorage.getItem("visitor")) {
      console.log("blabla");

      if (authState === EAuthState.Guest) {
        checkAuth(dispatch);
      } else if (activitiesState !== EActivitiesState.Fetched) {
        fetchActivities(dispatch);
      }
    } else {
      dispatch(
        setActivitiesState({
          activitiesState: EActivitiesState.Fetched,
          activities: handleNewData(mockActivities),
          selected: -1,
        })
      );
    }
  }, [authState, activitiesState]);

  const render = () => {
    if (authState === EAuthState.Error) {
      navigate("/");
    }
    if (
      (authState === EAuthState.Guest &&
        activitiesState === EActivitiesState.Idle) ||
      (authState === EAuthState.User &&
        activitiesState === EActivitiesState.Fetched) ||
      authState === EAuthState.Visitor ||
      (localStorage.getItem("visitor") &&
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
