import { ListItem, Card, Typography, Box } from "@mui/material";
import DrawedActivity from "../models/DrawedActivity";
import Favorite from "@mui/icons-material/Favorite";
import { LatLng, Map, map } from "leaflet";
import { mapZoomHandler } from "../utils/handleMap";
export const ActivityCard: React.FC<{
  activity: DrawedActivity;
  index: Number;
  map: Map;
  updateLineColor: (index: number) => void;
}> = ({ activity, index, map, updateLineColor }) => {
  console.log(activity.start_ll);
  return (
    <ListItem onClick={() => mapZoomHandler(activity, map, updateLineColor)}>
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
              <div>
                lat: {activity.start_ll ? activity.start_ll.lat : "not known"}
              </div>
              <div>
                lng: {activity.start_ll ? activity.start_ll.lng : "not known"}
              </div>
              {activity.average_heartrate}

              <div>{activity.distance}</div>
            </div>
          </div>
        </Card>
      </Box>
    </ListItem>
  );
};
