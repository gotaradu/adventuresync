import DrawedActivity from "../models/DrawedActivity";
import { Map } from "leaflet";
const mapZoomHandler = (
  activity: DrawedActivity,
  map: Map,
  setColor: (index: number | null) => void
) => {
  if (activity.start_ll) map.flyTo(activity.start_ll, 18, { animate: true });
  setColor(-1);
  const onZoomEnd = () => {
    map.off("zoomend", onZoomEnd);
    setColor(activity.index);
  };
  map.on("zoomend", onZoomEnd);
};
export { mapZoomHandler };
