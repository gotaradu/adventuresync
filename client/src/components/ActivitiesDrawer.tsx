import { useState, useMemo } from "react";
import { Button, CardHeader, Card, List } from "@mui/material";
import { Drawer } from "@mui/material";
import { useMap } from "react-leaflet";

import { ActivityCard } from "./ActivityCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { v4 as uuidv4 } from "uuid";
import { setSelected } from "../context/activitiesSlice";
import { EActivitiesState } from "../utils/types";
const ActivitiesDrawer: React.FC = () => {
  const { activities, activitiesState } = useSelector(
    (state: RootState) => state.activities
  );

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  const dispatch = useDispatch();
  const map = useMap();

  const renderedCards = useMemo(() => {
    return activities.map((activity, index) => (
      <ActivityCard
        key={uuidv4()}
        activity={activity}
        index={index}
        map={map}
      />
    ));
  }, [activities]);

  const handleHeatzone = () => {
    dispatch(setSelected(-2));
    toggleDrawer();
  };

  return (
    <>
      <Button
        onClick={toggleDrawer}
        sx={{
          position: "absolute",
          zIndex: "400",
          top: "2%",
          right: open ? "-1%" : "2%",
          background: "white",
          border: "2px solid black",
          transition: "right 0.3s ease",
          display: open ? "none" : "",
        }}
        color="success"
      >
        {open ? "Close Activities" : "Open Activities"}
      </Button>
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
