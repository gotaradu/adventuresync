import CustomMap from "../components/CustomMap";

import React, { useEffect } from "react";
import { EActivitiesState, EAuthState } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";

import { useNavigate } from "react-router-dom";
import { handleOnRender } from "../utils/visitor";
import { CustomLoading } from "../components/CustomLoading";

export const ActivitiesPageMock: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useSelector((state: RootState) => state.auth);
  const { activitiesState } = useSelector(
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
      return <CustomMap path="stats-mock" />;
    else return <CustomLoading />;
  };

  return render();
};
