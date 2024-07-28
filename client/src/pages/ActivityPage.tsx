import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { ActivityState } from "../utils/types";
import { handleSingleActivity } from "../utils/activities";

import { Error } from "../components/Error";
import { CustomActivity } from "../components/CustomActivity";
import { CustomLoading } from "../components/CustomLoading";

export const ActivityPage: React.FC = () => {
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
    handleSingleActivity(
      authState,
      navigate,
      activityId,
      dispatch,
      useCustomState
    );
  }, [authState, navigate]);

  if (!customState.activity && !customState.fetchError) {
    return <CustomLoading />;
  } else if (
    customState.activity &&
    !customState.fetchError &&
    customState.altitudeStream
  )
    return (
      <CustomActivity
        activity={customState.activity}
        streamData={customState.altitudeStream}
      />
    );
  else {
    return <Error message={customState.fetchError} />;
  }
};
