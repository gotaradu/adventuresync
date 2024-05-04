import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { ActivityCard } from "./ActivityCard";
import React from "react";
import StravaPoint from "../models/StravaPoint";
import { useMap } from "react-leaflet";
import DrawedActivity from "../models/DrawedActivity";
import { icon } from "../utils/icons";
import { useState, useEffect } from "react";

const SetViewOnClick: React.FC<{ coords: StravaPoint }> = ({ coords }) => {
  const map = useMap();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    console.log("called");
    if (!firstRender) {
      map.setZoom(5);
      map.flyTo([coords.latitude, coords.longitude], 15);
    } else {
      map.flyTo([coords.latitude, coords.longitude], 5);
      setFirstRender(false);
    }
  }, [coords]);

  return null;
};

const CustomMap: React.FC<{
  activities: DrawedActivity[];
  mapCenter: StravaPoint;
  colorIndex: number | null;
  updateMapCenter: (newCenter: StravaPoint) => void;
  updateLineColor: (index: number) => void;
}> = ({
  activities,
  mapCenter,
  colorIndex,
  updateMapCenter,
  updateLineColor,
}) => {
  return (
    <MapContainer scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {activities
        ? activities.map((activity: DrawedActivity, index: number) => (
            <React.Fragment key={index}>
              {activity.mapExists && activity.pointsa ? (
                <Marker
                  riseOnHover
                  icon={icon(activity.sport_type)}
                  key={`marker-${index}`}
                  position={[
                    activity.pointsa[0].latitude,
                    activity.pointsa[0].longitude,
                  ]}
                  eventHandlers={{
                    click: () => {
                      updateLineColor(index);
                      if (activity && activity.pointsa && activity.pointsa[0])
                        updateMapCenter({
                          latitude: activity.pointsa[0].latitude,
                          longitude: activity.pointsa[0].longitude,
                        });
                    },
                  }}
                >
                  <Popup>
                    {
                      // <ActivityCard
                      //   activity={activity}
                      //   updateMapCenter={updateMapCenter}
                      //   updateLineColor={() => updateLineColor(index)}
                      // />
                    }
                  </Popup>
                </Marker>
              ) : (
                ""
              )}
              <Polyline
                key={`polyline-${index}`}
                pathOptions={{
                  color: colorIndex == index ? "red" : "green",
                  opacity: colorIndex == index ? 1 : 0.2,
                  weight: colorIndex == index ? 7 : 2,
                  fillOpacity: colorIndex == index ? 7 : 0.2,
                }}
                positions={
                  activity.pointsa
                    ? activity.pointsa.map((point: StravaPoint) => [
                        point.latitude,
                        point.longitude,
                      ])
                    : []
                }
              />
            </React.Fragment>
          ))
        : ""}
      <SetViewOnClick coords={mapCenter} />
    </MapContainer>
  );
};

export default CustomMap;
