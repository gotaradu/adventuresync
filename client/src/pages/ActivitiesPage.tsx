import { useEffect } from "react";
import CustomMap from "../components/CustomMap";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
export const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    athlete,
    isLoggedIn,
    role,
    loading,
    setLoggedIn,
    setRole,
    setAthlete,
    checkAuth,
    setLoading,
  } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);
  return <CustomMap />;
};
