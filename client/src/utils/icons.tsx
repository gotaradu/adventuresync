import running from "../css/running.gif";
import cycling from "../css/cycling.gif";
import soccer from "../css/soccer.gif";
import defaultSport from "../css/default.gif";

import L from "leaflet";

const runningIcon = L.icon({
  iconUrl: running,
  iconSize: [42, 42],
  iconAnchor: [16, 32],
  className: "round-icon",
});

const cyclingIcon = L.icon({
  iconUrl: cycling,
  iconSize: [42, 42],
  iconAnchor: [16, 32],
});
const soccerIcon = L.icon({
  iconUrl: soccer,
  iconSize: [42, 42],
  iconAnchor: [16, 32],
});
const defaultIcon = L.icon({
  iconUrl: defaultSport,
  iconSize: [42, 42],
  iconAnchor: [16, 32],
});

const icon = (sport_type: string) => {
  return sport_type == "Run" || sport_type == "TrailRun"
    ? runningIcon
    : sport_type == "MountainBikeRide " || sport_type == "Ride"
    ? cyclingIcon
    : sport_type == "Soccer"
    ? soccerIcon
    : defaultIcon;
};

export { runningIcon, cyclingIcon, soccerIcon, defaultIcon, icon };
