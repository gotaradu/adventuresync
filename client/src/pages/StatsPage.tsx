import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { EActivitiesState, EAuthState } from "../utils/types";
import { fetchActivities, handleAllActivities } from "../utils/activities";
import { checkAuth } from "../utils/auth";

import { CustomLoading } from "../components/CustomLoading";
import { StatsBox } from "../components/StatsBox";

export const StatsPage = () => {
  const navigate = useNavigate();
  const { authState } = useSelector((state: RootState) => state.auth);
  const { activitiesState, activities } = useSelector(
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
      return <StatsBox activities={activities} />;
    else return <CustomLoading />;
  };
  return render();
};
