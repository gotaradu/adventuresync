import DrawedActivity from "../models/DrawedActivity";
import { LatLng, Map } from "leaflet";

export const arrayToLatLng = (coords: [number, number]) => {
  if (coords.length === 2) return new LatLng(coords[0], coords[1]);
  return new LatLng(0, 0);
};

const mapZoomHandler = (activity: DrawedActivity, map: Map) => {
  if (activity.start_latlng.length === 2) {
    map.setView(activity.start_latlng, 18);
  }
  const onZoomEnd = () => {
    map.off("zoomend", onZoomEnd);
  };
  map.on("zoomend", onZoomEnd);
};
export { mapZoomHandler };
