import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../context/store";

import { EActivitiesState, EAuthState } from "../utils/types";

import { useEffect } from "react";

import { handleOnRender } from "../utils/visitor";
import { CustomLoading } from "../components/CustomLoading";
import { StatsBox } from "../components/StatsBox";

export const StatsPageMock: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useSelector((state: RootState) => state.auth);
  const { activitiesState, activities } = useSelector(
    (state: RootState) => state.activities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleOnRender(dispatch, navigate);
  }, [authState, activitiesState]);

  const render = () => {
    if (
      authState === EAuthState.Visitor &&
      localStorage.getItem("visitor") &&
      activitiesState === EActivitiesState.Fetched
    )
      return <StatsBox activities={activities} />;
    else return <CustomLoading />;
  };

  return render();
};
