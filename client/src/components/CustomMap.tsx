import { MapContainer, useMap, TileLayer } from "react-leaflet";
import React, { useState } from "react";
import { LatLng } from "leaflet";
import DrawedActivity from "../models/DrawedActivity";
import SetViewOnClick from "./SetViewOnClick";
import ActivitiesDrawer from "./ActivitiesDrawer";
import CustomPolylines from "./CustomPolylines";
import CustomMarkers from "./CustomMarkers";
import { cachedTileLayer } from "./CustomTileLayer";

const CustomMap: React.FC<{
  activities: DrawedActivity[];
}> = ({ activities }) => {
  const [mapCenter, setMapCenter] = useState<LatLng>(new LatLng(50, 25));
  const [color, setColor] = useState<number | null>(null);

  return (
    <MapContainer scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CustomMarkers activities={activities} setColor={setColor} />
      <CustomPolylines activities={activities} colorIndex={color} />
      <SetViewOnClick coords={mapCenter} />
      <ActivitiesDrawer activities={activities} setColor={setColor} />
    </MapContainer>
  );
};

export default CustomMap;
