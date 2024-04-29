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
      map.setView([coords.latitude, coords.longitude], 20);
    } else {
      map.setView([coords.latitude, coords.longitude], 5);
      setFirstRender(false);
    }
  }, [coords]);

  return null;
};

const CustomMap: React.FC<{
  activities: DrawedActivity[];
  mapCenter: StravaPoint;
}> = ({ activities, mapCenter }) => {
  console.log(mapCenter);
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
                >
                  <Popup>
                    {
                      // <ActivityCard
                      //   activity={activity}
                      //   updateMapCenter={updateMapCenter}
                      // />
                    }
                  </Popup>
                </Marker>
              ) : (
                ""
              )}
              <Polyline
                key={`polyline-${index}`}
                pathOptions={{ color: "red" }}
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
