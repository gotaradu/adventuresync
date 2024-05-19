import { Polyline } from "react-leaflet";
import React from "react";
import DrawedActivity from "../models/DrawedActivity";

const CustomPolylines: React.FC<{
  activities: DrawedActivity[];
  colorIndex: number | null;
}> = ({ activities, colorIndex }) => {
  return (
    <>
      {activities &&
        activities.map(
          (activity: DrawedActivity, index: number) =>
            activity.mapExists &&
            activity.pointsa &&
            activity.pointsa.length > 0 && (
              <Polyline
                key={`polyline-${index}`}
                pathOptions={{
                  color: colorIndex === index ? "red" : "",
                  opacity: colorIndex === index ? 1 : 0,
                }}
                positions={activity.pointsa}
                smoothFactor={10}
              />
            )
        )}
    </>
  );
};

export default CustomPolylines;
