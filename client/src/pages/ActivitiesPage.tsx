import CustomMap from "../components/CustomMap";

import React, { useEffect } from "react";
import { EActivitiesState, EAuthState } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { checkAuth } from "../utils/auth";
import { fetchActivities, handleAllActivities } from "../utils/activities";
import { useNavigate } from "react-router-dom";
import { CustomLoading } from "../components/CustomLoading";

export const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useSelector((state: RootState) => state.auth);
  const { activitiesState } = useSelector(
    (state: RootState) => state.activities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleAllActivities(authState, activitiesState, navigate, dispatch);
  }, [authState, activitiesState, checkAuth, fetchActivities]);

  const render = () => {
    if (
      authState === EAuthState.User &&
      activitiesState === EActivitiesState.Fetched
    )
      return <CustomMap path="stats" />;
    else return <CustomLoading />;
  };

  return render();
};

export default ActivitiesPage;
