import { LatLng } from "leaflet";
import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
const SetViewOnClick: React.FC<{
  coords: LatLng;
}> = ({ coords }) => {
  const map = useMap();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (!firstRender) {
      map.flyTo(coords, 18, { animate: true, duration: 10 });
      const onZoomEnd = () => {
        map.off("zoomend", onZoomEnd);
      };
      map.on("zoomend", onZoomEnd);
    } else {
      map.setView(coords, 3);
      setFirstRender(false);
    }
  }, [coords]);

  return null;
};

export default SetViewOnClick;
