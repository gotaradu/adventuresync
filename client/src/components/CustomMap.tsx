import { MapContainer, TileLayer } from "react-leaflet";
import React, { useRef, useState } from "react";
import { LatLng } from "leaflet";
import SetViewOnClick from "./SetViewOnClick";
import ActivitiesDrawer from "./ActivitiesDrawer";
import CustomPolylines from "./CustomPolylines";
import CustomMarkers from "./CustomMarkers";
import { Legend } from "./Legend";

const CustomMap: React.FC<{ path: string }> = ({ path }) => {
  const [mapCenter] = useState<LatLng>(new LatLng(40, -25));
  const popupRef = useRef(null);

  return (
    <MapContainer scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CustomMarkers popupRef={popupRef} path={path} />
      <CustomPolylines />
      <SetViewOnClick coords={mapCenter} />
      <ActivitiesDrawer popupRef={popupRef} path={path} />
      <Legend />
    </MapContainer>
  );
};

export default CustomMap;
