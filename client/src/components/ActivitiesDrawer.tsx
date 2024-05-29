import { useState } from "react";
import { Button, CardHeader, Card, List } from "@mui/material";
import { Drawer } from "@mui/material";
import { useMap } from "react-leaflet";
import DrawedActivity from "../models/DrawedActivity";
import { ActivityCard } from "./ActivityCard";

const ActivitiesDrawer: React.FC<{
  activities: DrawedActivity[];
  updateLineColor: (index: number) => void;
}> = ({ activities, updateLineColor }) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const map = useMap();
  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
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
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <List>
          {activities
            ? activities.map((activity: DrawedActivity, index: number) => (
                <ActivityCard
                  key={`activityCard-${index}`}
                  activity={activity}
                  index={index}
                  map={map}
                  updateLineColor={updateLineColor}
                />
              ))
            : ""}
          <Button
            onClick={toggleDrawer(false)}
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
      ;
    </>
  );
};
export default ActivitiesDrawer;
