import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import { ActivityCard } from "./ActivityCard";
import React from "react";
import DrawedActivity from "../models/DrawedActivity";
import { icon } from "../utils/icons";
import { LatLng } from "leaflet";
import { useState } from "react";
import SetViewOnClick from "./SetViewOnClick";
import ZoomHandler from "./ZoomHandler";

const CustomMap: React.FC<{
  activities: DrawedActivity[];
  mapCenter: LatLng;
  colorIndex: number | null;
  updateMapCenter: (newCenter: LatLng) => void;
  updateLineColor: (index: number) => void;
  zooming: boolean;
  setZooming: (zooming: boolean) => void;
}> = ({
  activities,
  mapCenter,
  colorIndex,
  updateMapCenter,
  updateLineColor,
  zooming,
  setZooming,
}) => {
  const [mapIndex, setMapIndex] = useState<number | null>(null);
  const handleClick = (
    index: number,
    center: LatLng,
    activity: DrawedActivity
  ) => {
    updateMapCenter(center);
    setMapIndex(index);
    updateLineColor(index);
    if (!zooming) {
      setZooming(true);
    }
  };

  const handleZoomEnd = () => {
    setZooming(false);
  };

  return (
    <MapContainer scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomHandler onZoomEnd={handleZoomEnd} />
      {activities &&
        activities.map(
          (activity: DrawedActivity, index: number) =>
            activity.mapExists &&
            activity.pointsa &&
            activity.pointsa[0] && (
              <React.Fragment key={index}>
                <Marker
                  riseOnHover
                  icon={icon(activity.sport_type)}
                  position={activity.pointsa[0]}
                  eventHandlers={{
                    click: () => {
                      handleClick(index, activity.pointsa[0], activity);
                    },
                  }}
                />
                {(!zooming || (zooming && colorIndex === index)) && (
                  <Polyline
                    key={`polyline-${index}`}
                    pathOptions={{
                      color: colorIndex === index ? "red" : "green",
                      opacity: colorIndex === index ? 1 : 0,
                    }}
                    positions={activity.pointsa}
                    smoothFactor={10}
                  />
                )}
              </React.Fragment>
            )
        )}
      <SetViewOnClick
        coords={mapCenter}
        colorIndex={mapIndex}
        updateLineColor={updateLineColor}
      />
    </MapContainer>
  );
};

export default CustomMap;
