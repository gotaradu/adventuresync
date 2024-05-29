import DrawedActivity from "../models/DrawedActivity";
import { Map } from "leaflet";
const mapZoomHandler = (
  activity: DrawedActivity,
  map: Map,
  updateLineColor: (index: number) => void
) => {
  if (activity.start_ll) map.flyTo(activity.start_ll, 18, { animate: true });
  const onZoomEnd = () => {
    map.off("zoomend", onZoomEnd);
    updateLineColor(activity.index);
  };
  map.on("zoomend", onZoomEnd);
};
export { mapZoomHandler };
