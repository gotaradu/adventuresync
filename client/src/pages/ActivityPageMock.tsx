import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { ActivityState, EAuthState } from "../utils/types";

import { CustomActivity } from "../components/CustomActivity";
import { handleSingleActivityMock } from "../utils/visitor";
import { Error } from "../components/Error";

export const ActivityPageMock: React.FC = () => {
  const { activityId } = useParams<{ activityId: string | undefined }>();
  const navigate = useNavigate();

  const { authState } = useSelector((state: RootState) => state.auth);

  const [customState, useCustomState] = useState<ActivityState>({
    activity: null,
    altitudeStream: null,
    fetchError: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    handleSingleActivityMock(navigate, activityId, dispatch, useCustomState);
  }, [authState, navigate]);

  const render = () => {
    if (!customState.activity)
      return (
        <Error message="Unavailable activity to mock data. Return to main page" />
      );
    if (authState === EAuthState.Visitor && localStorage.getItem("visitor"))
      return (
        <CustomActivity
          activity={customState.activity}
          altitude={customState.altitudeStream}
        />
      );
    else
      return (
        <Error message="Missing visitor token. Return to main page to get a new one" />
      );
  };

  return render();
};
