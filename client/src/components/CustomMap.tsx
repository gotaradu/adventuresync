import { MapContainer, useMap, TileLayer } from "react-leaflet";
import React, { useState } from "react";
import { LatLng } from "leaflet";
import DrawedActivity from "../models/DrawedActivity";
import SetViewOnClick from "./SetViewOnClick";
import ActivitiesDrawer from "./ActivitiesDrawer";
import CustomPolylines from "./CustomPolylines";
import CustomMarkers from "./CustomMarkers";
import { cachedTileLayer } from "./CustomTileLayer";

const CustomTileLayerComponent: React.FC = () => {
  const map = useMap();

  React.useEffect(() => {
    const tileLayer = cachedTileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    tileLayer.addTo(map);

    return () => {
      map.removeLayer(tileLayer);
    };
  }, [map]);

  return null;
};

const CustomMap: React.FC<{
  activities: DrawedActivity[];
  colorIndex: number | null;
  updateLineColor: (index: number | null, change: boolean) => void;
}> = ({ activities, colorIndex, updateLineColor }) => {
  const [mapCenter, setMapCenter] = useState<LatLng>(new LatLng(50, 25));

  return (
    <MapContainer scrollWheelZoom={true}>
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <CustomTileLayerComponent />

      <CustomMarkers
        activities={activities}
        updateLineColor={updateLineColor}
      />
      <CustomPolylines activities={activities} colorIndex={colorIndex} />
      <SetViewOnClick coords={mapCenter} />
      <ActivitiesDrawer
        activities={activities}
        updateLineColor={updateLineColor}
      />
    </MapContainer>
  );
};

export default CustomMap;
