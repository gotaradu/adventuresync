import { LatLng } from "leaflet";
import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
const SetViewOnClick: React.FC<{
  coords: LatLng;
  colorIndex: number | null;
  updateLineColor: (colorIndex: number) => void;
}> = ({ coords, colorIndex, updateLineColor }) => {
  const map = useMap();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (!firstRender) {
      map.flyTo(coords, 18, { animate: true });
      const onZoomEnd = () => {
        if (colorIndex) updateLineColor(colorIndex);
        map.off("zoomend", onZoomEnd);
      };
      map.on("zoomend", onZoomEnd);
    } else {
      map.setView(coords, 5);
      setFirstRender(false);
    }
  }, [coords]);

  return null;
};

export default SetViewOnClick;
