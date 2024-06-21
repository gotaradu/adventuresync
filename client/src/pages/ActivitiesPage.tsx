import { useEffect, useState } from "react";
import CustomMap from "../components/CustomMap";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CenteredContent from "../components/CenteredContent";
import React from "react";
import { useActivities } from "../context/ActivitiesProvider";

export const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, loading, checkAuth, setLoading } = useAuth();

  const {
    activities,
    setActivities,
    fetchActivities,
    setLocalStorage,
    getLocalStorage,
  } = useActivities();

  useEffect(() => {
    if (isLoggedIn) fetchActivities();
  }, []);

  if (loading || isLoggedIn) {
    return (
      <React.Fragment>
        {loading ? (
          <CenteredContent>
            <CircularProgress />
          </CenteredContent>
        ) : (
          <CustomMap activities={activities} />
        )}
      </React.Fragment>
    );
  } else {
    return (
      <CenteredContent>
        <CircularProgress />
      </CenteredContent>
    );
  }
};

export default ActivitiesPage;
