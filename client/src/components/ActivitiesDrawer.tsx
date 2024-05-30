import { useState, useMemo } from "react";
import { Button, CardHeader, Card, List } from "@mui/material";
import { Drawer } from "@mui/material";
import { useMap } from "react-leaflet";
import DrawedActivity from "../models/DrawedActivity";
import { ActivityCard } from "./ActivityCard";

const ActivitiesDrawer: React.FC<{
  activities: DrawedActivity[];
  setColor: (index: number | null) => void;
}> = ({ activities, setColor }) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  const map = useMap();
  const renderedCards = useMemo(() => {
    return activities.map((activity, index) => (
      <ActivityCard
        key={`activityCard-${index}`}
        activity={activity}
        index={index}
        map={map}
        setColor={setColor}
      />
    ));
  }, [activities, map]);

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
