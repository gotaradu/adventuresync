import { useMap } from "react-leaflet";
import { useEffect } from "react";

const ZoomHandler: React.FC<{ onZoomEnd: () => void }> = ({ onZoomEnd }) => {
  const map = useMap();

  useEffect(() => {
    const handleZoomEnd = () => {
      onZoomEnd();
    };

    map.on("moveend", handleZoomEnd);

    return () => {
      map.off("moveend", handleZoomEnd);
    };
  }, [map, onZoomEnd]);

  return null;
};

export default ZoomHandler;
