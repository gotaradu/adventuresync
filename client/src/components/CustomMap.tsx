import { MapContainer, TileLayer } from "react-leaflet";
import React, { useState } from "react";
import { LatLng } from "leaflet";
import SetViewOnClick from "./SetViewOnClick";
import ActivitiesDrawer from "./ActivitiesDrawer";
import CustomPolylines from "./CustomPolylines";
import CustomMarkers from "./CustomMarkers";
import { Legend } from "./Legend";

const CustomMap: React.FC<{}> = () => {
  const [mapCenter, setMapCenter] = useState<LatLng>(new LatLng(50, 25));

  return (
    <MapContainer scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CustomMarkers />
      <CustomPolylines />
      <SetViewOnClick coords={mapCenter} />
      <ActivitiesDrawer />
      <Legend />
    </MapContainer>
  );
};

export default CustomMap;
