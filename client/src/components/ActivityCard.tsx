import { ListItem, Card, Typography, Box } from "@mui/material";
import DrawedActivity from "../models/DrawedActivity";
import Favorite from "@mui/icons-material/Favorite";
import StravaPoint from "../models/StravaPoint";
//
export const ActivityCard: React.FC<{
  activity: DrawedActivity;
  updateMapCenter: (newCenter: StravaPoint) => void;
}> = ({ activity, updateMapCenter }) => {
  const handleClick = () => {
    if (activity !== null && activity.pointsa)
      updateMapCenter({
        latitude: activity.pointsa[0]?.latitude,
        longitude: activity.pointsa[0]?.longitude,
      });
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
