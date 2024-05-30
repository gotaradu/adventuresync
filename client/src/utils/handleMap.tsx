import DrawedActivity from "../models/DrawedActivity";
import { Map } from "leaflet";
const mapZoomHandler = (
  activity: DrawedActivity,
  map: Map,
  updateLineColor: (index: number | null, change: boolean) => void
) => {
  if (activity.start_ll) map.flyTo(activity.start_ll, 18, { animate: true });
  updateLineColor(-1, false);
  const onZoomEnd = () => {
    map.off("zoomend", onZoomEnd);
    updateLineColor(activity.index, true);
  };
  map.on("zoomend", onZoomEnd);
};
export { mapZoomHandler };
