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
import { MutableRefObject } from "react";
import { useNavigate } from "react-router-dom";
export const ActivityCard: React.FC<{
  activity: DrawedActivity;
  index: number;
  map: Map;
  popupRef: MutableRefObject<L.Popup | null>;
  path: string;
  onClick: () => void;
}> = ({ activity, index, map, popupRef, path, onClick }) => {
  const { selected } = useSelector((state: RootState) => state.activities);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    console.log(activity);
    onClick();
    await mapZoomHandler(activity, map, popupRef);
    dispatch(setSelected(index));
    const element = popupRef.current?.getElement();
    if (element) {
      const button = element.querySelector<HTMLButtonElement>(".popup-button");
      if (button) {
        button.onclick = () => {
          navigate(`/${path}/${activity.id}`);
        };
      }
    }
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
              {activity.averageHeartRate ? (
                <div>
                  <Favorite sx={{ fontSize: 15 }} />
                  {activity.averageHeartRate}
                </div>
              ) : null}

              {activity.elapsedTime ? (
                <div>
                  <TimerIcon sx={{ fontSize: 15 }} />
                  <span>{activity.elapsedTime}</span>
                </div>
              ) : null}
              {activity.startLatLng.length > 0 ? (
                <div>
                  <div>
                    <PublicIcon sx={{ fontSize: 15 }} />
                    {"lat:" +
                      Math.round(
                        (activity.startLatLng[0] + Number.EPSILON) * 100
                      ) /
                        100}
                  </div>

                  <div>
                    <PublicIcon sx={{ fontSize: 15 }} />
                    {"lng:" +
                      Math.round(
                        (activity.startLatLng[1] + Number.EPSILON) * 100
                      ) /
                        100}
                  </div>
                </div>
              ) : null}

              {activity.distance > 0 ? (
                <div>
                  <DirectionsRunIcon sx={{ fontSize: 15 }} />
                  {activity.distance + " km"}
                </div>
              ) : null}
              {activity.totalElevationGain ? (
                <div>
                  <LandscapeIcon sx={{ fontSize: 15 }} />
                  {activity.totalElevationGain + " m"}
                </div>
              ) : null}
              {activity.distance && activity.elapsedTime ? (
                <div>
                  <RocketIcon sx={{ fontSize: 15 }} />
                  {activity.averageSpeed}
                </div>
              ) : null}
              {activity.startDate ? (
                <div>
                  <CalendarMonthIcon sx={{ fontSize: 15 }} />
                  {new Date(activity.startDate).toDateString()}
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      </Box>
    </ListItem>
  );
};
