import { ListItem, Card, Typography, Box } from "@mui/material";
import DrawedActivity from "../models/DrawedActivity";
import Favorite from "@mui/icons-material/Favorite";
import TimerIcon from "@mui/icons-material/Timer";
import PublicIcon from "@mui/icons-material/Public";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import LandscapeIcon from "@mui/icons-material/Landscape";
import RocketIcon from "@mui/icons-material/Rocket";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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
            {activity.name ? (
              <Typography sx={{ fontSize: 18 }} gutterBottom>
                {activity.name}
              </Typography>
            ) : null}

            <div style={{ border: "black" }}>
              {activity.average_heartrate ? (
                <div>
                  <Favorite sx={{ fontSize: 15 }} />
                  {activity.average_heartrate}
                </div>
              ) : null}

              {activity.elapsed_time ? (
                <div>
                  <TimerIcon sx={{ fontSize: 15 }} />
                  <span>
                    {(Math.floor(activity.elapsed_time / 3600) < 10
                      ? "0" + Math.floor(activity.elapsed_time / 3600)
                      : Math.floor(activity.elapsed_time / 3600)) +
                      ":" +
                      (Math.floor((activity.elapsed_time % 3600) / 60) < 10
                        ? "0" + Math.floor((activity.elapsed_time % 3600) / 60)
                        : Math.floor((activity.elapsed_time % 3600) / 60)) +
                      ":" +
                      (Math.floor(activity.elapsed_time % 60) < 10
                        ? "0" + Math.floor(activity.elapsed_time % 60)
                        : Math.floor(activity.elapsed_time % 60))}
                  </span>
                </div>
              ) : null}
              {activity.start_latlng.length > 0 ? (
                <div>
                  <div>
                    <PublicIcon sx={{ fontSize: 15 }} />
                    {"lat:" +
                      Math.round(
                        (activity.start_latlng[0] + Number.EPSILON) * 100
                      ) /
                        100}
                  </div>

                  <div>
                    <PublicIcon sx={{ fontSize: 15 }} />
                    {"lng:" +
                      Math.round(
                        (activity.start_latlng[1] + Number.EPSILON) * 100
                      ) /
                        100}
                  </div>
                </div>
              ) : null}

              {activity.distance > 0 ? (
                <div>
                  <DirectionsRunIcon sx={{ fontSize: 15 }} />
                  {(activity.distance / 1000).toFixed(2) + " km"}
                </div>
              ) : null}
              {activity.total_elevation_gain ? (
                <div>
                  <LandscapeIcon sx={{ fontSize: 15 }} />
                  {activity.total_elevation_gain + " m"}
                </div>
              ) : null}
              {activity.distance && activity.elapsed_time ? (
                <div>
                  <RocketIcon sx={{ fontSize: 15 }} />
                  {Math.floor(
                    activity.elapsed_time / (activity.distance / 1000) / 60
                  ) +
                    ":" +
                    Math.floor(
                      (activity.elapsed_time / (activity.distance / 1000)) % 60
                    )}
                </div>
              ) : null}
              {activity.start_date ? (
                <div>
                  <CalendarMonthIcon sx={{ fontSize: 15 }} />
                  {new Date(activity.start_date).toDateString()}
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      </Box>
    </ListItem>
  );
};
