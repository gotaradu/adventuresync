import CustomMap from "../components/CustomMap";
import { CircularProgress } from "@mui/material";
import CenteredContent from "../components/CenteredContent";
import React, { useEffect } from "react";
import { EActivitiesState, EAuthState } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { checkAuth } from "../utils/auth";
import { fetchActivities } from "../utils/activities";
import { useNavigate } from "react-router-dom";
import { Legend } from "../components/Legend";
export const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useSelector((state: RootState) => state.auth);
  const { activitiesState } = useSelector(
    (state: RootState) => state.activities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (authState === EAuthState.Guest) {
      checkAuth(dispatch);
    } else if (activitiesState !== EActivitiesState.Fetched)
      fetchActivities(dispatch);
    if (authState === EAuthState.Error) {
      navigate("/");
    }
  }, [authState, activitiesState]);

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
