import { ListItem, Card, Typography, Box } from "@mui/material";
import DrawedActivity from "../models/DrawedActivity";
import Favorite from "@mui/icons-material/Favorite";
import { mapZoomHandler } from "../utils/handleMap";
import { useDispatch, useSelector } from "react-redux";
import { Map } from "leaflet";
import { RootState } from "../context/store";
import { setSelected } from "../context/activitiesSlice";
export const ActivityCard: React.FC<{
  activity: DrawedActivity;
  index: number;
  map: Map;
}> = ({ activity, index, map }) => {
  const { selected } = useSelector((state: RootState) => state.activities);
  const dispatch = useDispatch();

  const handleClick = () => {
    mapZoomHandler(activity, map);
    dispatch(setSelected(index));
  };

  return (
    <ListItem onClick={handleClick}>
      <Box width={250}>
        <Card
          sx={{
            margin: "2px",
            border: index === selected ? "solid red 3px" : "solid black 3px",
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
                lat:
                {activity.start_latlng
                  ? Math.round(
                      (activity.start_latlng[0] + Number.EPSILON) * 100
                    ) / 100
                  : "not known"}
              </div>
              <div>
                lng:
                {activity.start_latlng
                  ? Math.round(
                      (activity.start_latlng[1] + Number.EPSILON) * 100
                    ) / 100
                  : "not known"}
              </div>
              {activity.average_heartrate}s<div>{activity.distance}</div>
            </div>
          </div>
        </Card>
      </Box>
    </ListItem>
  );
};
