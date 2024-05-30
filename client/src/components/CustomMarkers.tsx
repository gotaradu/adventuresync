import { useMap, Marker } from "react-leaflet";
import React from "react";
import { icon } from "../utils/icons";
import DrawedActivity from "../models/DrawedActivity";
import { mapZoomHandler } from "../utils/handleMap";

const CustomMarkers: React.FC<{
  activities: DrawedActivity[];
  setColor: (index: number | null) => void;
}> = ({ activities, setColor }) => {
  const map = useMap();
  return (
    <>
      {activities &&
        activities.map(
          (activity: DrawedActivity, index: number) =>
            activity.mapExists &&
            activity.pointsa &&
            activity.pointsa.length > 0 && (
              <Marker
                key={`marker-${index}`}
                riseOnHover
                riseOffset={index}
                icon={icon(activity.sport_type)}
                position={activity.start_ll}
                eventHandlers={{
                  click: () => mapZoomHandler(activity, map, setColor),
                }}
              />
            )
        )}
    </>
  );
};

export default CustomMarkers;
