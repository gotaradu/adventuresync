import CustomMap from "../components/CustomMap";
import { CircularProgress } from "@mui/material";
import CenteredContent from "../components/CenteredContent";
import React, { useEffect } from "react";
import { EActivitiesState, EAuthState } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { checkAuth } from "../utils/auth";
import {
  fetchActivities,
  handleNewData,
  getAllActivities,
} from "../utils/activities";
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

  const handleOnRender = async () => {
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
    if (authState === EAuthState.Visitor && localStorage.getItem("visitor")) {
      dispatch(
        setActivitiesState({
          activitiesState: EActivitiesState.Fetched,
          activities: handleNewData(mockActivities),
          selected: -1,
        })
      );
      return;
    }
    if (authState === EAuthState.Guest) {
      await checkAuth(dispatch);
      return;
    }
  };
  useEffect(() => {
    handleOnRender();
  }, [authState, activitiesState, checkAuth, fetchActivities]);

  const render = () => {
    if (
      (authState === EAuthState.User &&
        activitiesState === EActivitiesState.Fetched) ||
      (authState === EAuthState.Visitor &&
        localStorage.getItem("visitor") &&
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
