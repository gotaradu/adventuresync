import { useState, useMemo, MutableRefObject } from "react";
import {
  Button,
  List,
  Box,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Drawer,
} from "@mui/material";
import { useMap } from "react-leaflet";

import { ActivityCard } from "./ActivityCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";

import { setSelected } from "../context/activitiesSlice";

import { useNavigate } from "react-router-dom";

const ActivitiesDrawer: React.FC<{
  popupRef: MutableRefObject<L.Popup | null>;
  path: string;
}> = ({ popupRef, path }) => {
  const { activities } = useSelector((state: RootState) => state.activities);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const map = useMap();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isMobile ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              position: "fixed",
              zIndex: 400,
              top: "2%",
              right: "2%",
            }}
          >
            <Button
              onClick={handleMenuClick}
              sx={{
                background: "white",
                border: "2px solid black",
                display: open ? "none" : "block",
              }}
              color="success"
            >
              Menu
            </Button>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                navigate(`/${path}`);
                handleMenuClose();
              }}
            >
              Stats
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(`/`);
                handleMenuClose();
              }}
            >
              Home
            </MenuItem>
            <MenuItem
              onClick={() => {
                toggleDrawer();
                handleMenuClose();
              }}
            >
              Open Activities
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            position: "fixed",
            zIndex: 400,
            top: "2%",
            right: "2%",
          }}
        >
          <Button
            onClick={toggleDrawer}
            sx={{
              background: "white",
              border: "2px solid black",
              transition: "right 0.3s ease",
              display: open ? "none" : "block",
              margin: "5px",
              minWidth: "150px",
            }}
            color="success"
          >
            Open Activities
          </Button>
          <Button
            onClick={() => {
              navigate(`/${path}`);
            }}
            sx={{
              background: "white",
              border: "2px solid black",
              transition: "right 0.3s ease",
              display: open ? "none" : "block",
              margin: "5px",
              minWidth: "150px",
            }}
            color="success"
          >
            Stats
          </Button>
          <Button
            onClick={() => {
              navigate(`/`);
            }}
            sx={{
              background: "white",
              border: "2px solid black",
              transition: "right 0.3s ease",
              display: open ? "none" : "block",
              margin: "5px",
              minWidth: "150px",
            }}
            color="success"
          >
            Home
          </Button>
        </Box>
      )}
      <Drawer open={open} onClose={toggleDrawer} anchor="right">
        <Button
          onClick={handleHeatzone}
          sx={{
            position: "relative",
            zIndex: "400",
            margin: "10px",
            background: "white",
            border: "2px solid black",
          }}
          color="success"
        >
          View Heatzone
        </Button>

        <List>
          {renderedCards}
          <Button
            onClick={toggleDrawer}
            sx={{
              position: "relative",
              zIndex: "400",
              margin: "10px",
              background: "white",
              border: "2px solid black",
            }}
            color="success"
          >
            Close Activities
          </Button>
        </List>
      </Drawer>
    </>
  );
};

export default ActivitiesDrawer;
