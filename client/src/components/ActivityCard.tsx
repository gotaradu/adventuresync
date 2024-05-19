import { ListItem, Card, Typography, Box } from "@mui/material";
import DrawedActivity from "../models/DrawedActivity";
import Favorite from "@mui/icons-material/Favorite";
import { LatLng } from "leaflet";
//
export const ActivityCard: React.FC<{
  activity: DrawedActivity;
  updateMapCenter: (newCenter: LatLng) => void;
  updateLineColor: (index: number) => void;
}> = ({ activity, updateMapCenter, updateLineColor }) => {
  const handleClick = () => {
    if (activity !== null && activity.mapExists && activity.pointsa)
      updateMapCenter(
        new LatLng(activity.pointsa[0]?.lat, activity.pointsa[0]?.lng)
      );
  };

  return (
    <ListItem onClick={handleClick}>
      <Box width={250}>
        <Card
          sx={{
            margin: "2px",
            border: "solid black 3px",
            cursor: "pointer",
            transition: "transform 0.2s ease-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <div style={{ margin: "2px" }}>
            <Typography sx={{ fontSize: 18 }} gutterBottom>
              {activity.name}
            </Typography>
            <div style={{ border: "black" }}>
              <Favorite />

              {activity.average_heartrate}

              <div>{activity.distance}</div>
            </div>
          </div>
        </Card>
      </Box>
    </ListItem>
  );
};
