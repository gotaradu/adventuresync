import { Polyline, useMapEvents } from "react-leaflet";
import React from "react";
import DrawedActivity from "../models/DrawedActivity";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import { v4 as uuidv4 } from "uuid";

const CustomPolylines: React.FC = () => {
  const { activities, selected } = useSelector(
    (state: RootState) => state.activities
  );

  const renderPolyline = () => {
    if (selected === -2) {
      return (
        <>
          {activities.map((activity: DrawedActivity) => (
            <Polyline
              key={uuidv4()}
              pathOptions={{
                color: "red",
                opacity: 0.4,
              }}
              positions={activity.pointsa}
              smoothFactor={10}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          {activities.map((activity: DrawedActivity, index: number) => (
            <Polyline
              key={uuidv4()}
              pathOptions={{
                color: selected === index ? "red" : "",
                opacity: selected === index ? 1 : 0,
              }}
              positions={activity.pointsa}
              smoothFactor={10}
            />
          ))}
        </>
      );
    }
  };

  return <>{renderPolyline()}</>;
};

export default CustomPolylines;
