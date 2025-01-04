import { useState, useMemo, MutableRefObject } from "react";
import {
  Button,
  List,
  Box,
  Drawer,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useMap } from "react-leaflet";

import { ActivityCard } from "./ActivityCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";

import { setSelected } from "../context/activitiesSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";

import LogoutIcon from "@mui/icons-material/Logout";
import HeatMapIcon from "@mui/icons-material/Map";
import { EAuthState } from "../utils/types";

const ActivitiesDrawer: React.FC<{
  popupRef: MutableRefObject<L.Popup | null>;
  path: string;
}> = ({ popupRef, path }) => {
  const { activities } = useSelector((state: RootState) => state.activities);
  const { authState } = useSelector((state: RootState) => state.auth);

  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const map = useMap();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const renderedCards = useMemo(() => {
    return activities.map((activity, index) => (
      <ActivityCard
        key={activity.id}
        activity={activity}
        index={index}
        map={map}
        popupRef={popupRef}
        path={path}
        onClick={toggleDrawer}
      />
    ));
  }, [activities]);

  const handleHeatzone = () => {
    dispatch(setSelected(-2));
    toggleDrawer();
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 400,
        }}
      >
        <Tooltip title="Menu">
          <IconButton
            onClick={toggleDrawer}
            sx={{
              background: "white",
              border: "2px solid black",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Drawer open={open} onClose={toggleDrawer} anchor="right">
        <Box
          sx={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Button
            onClick={() => navigate("/")}
            startIcon={<HomeIcon />}
            variant="outlined"
            sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            Home
          </Button>
          <Button
            onClick={() => navigate(`/${path}`)}
            startIcon={<BarChartIcon />}
            variant="outlined"
            sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            Stats
          </Button>
          <Button
            onClick={handleHeatzone}
            startIcon={<HeatMapIcon />}
            variant="outlined"
            sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            View Heatzone
          </Button>
          {authState !== EAuthState.Visitor ? (
            <Button
              onClick={() => logout(dispatch)}
              startIcon={<LogoutIcon />}
              variant="outlined"
              sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
            >
              Logout
            </Button>
          ) : null}
        </Box>
        <List>{renderedCards}</List>
      </Drawer>
    </>
  );
};

export default ActivitiesDrawer;
