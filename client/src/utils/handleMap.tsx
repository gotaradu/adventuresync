import DrawedActivity from "../models/DrawedActivity";
import { Map } from "leaflet";
const mapZoomHandler = (
  activity: DrawedActivity,
  map: Map,
  updateLineColor: (index: number) => void
) => {
  map.flyTo(activity.start_latlng, 18, { animate: true });
  const onZoomEnd = () => {
    map.off("zoomend", onZoomEnd);
    updateLineColor(activity.index);
  };
  map.on("zoomend", onZoomEnd);
};
export { mapZoomHandler };
