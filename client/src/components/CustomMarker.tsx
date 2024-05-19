import { useMap, Marker } from "react-leaflet";
import React from "react";
import { LatLng } from "leaflet";

const CustomMarker: React.FC<{ markers: LatLng[] }> = ({ markers }) => {
  const map = useMap();
  return (
    <>
      {markers.map((el, i) => (
        <Marker
          key={i}
          position={[el.lat, el.lng]}
          eventHandlers={{
            click: () => {
              console.log("marker clicked", el);
              console.log(map.getZoom());
            },
          }}
        />
      ))}
      ;
    </>
  );
};

export default CustomMarker;
