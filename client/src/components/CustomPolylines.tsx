import { Polyline } from "react-leaflet";
import React from "react";
import DrawedActivity from "../models/DrawedActivity";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import { v4 as uuidv4 } from "uuid";
const CustomPolylines: React.FC<{}> = () => {
  const { activities, selected } = useSelector(
    (state: RootState) => state.activities
  );
  return (
    <>
      {activities &&
        activities.map(
          (activity: DrawedActivity, index: number) =>
            activity.mapExists &&
            activity.pointsa &&
            activity.pointsa.length > 0 && (
              <Polyline
                key={uuidv4()}
                pathOptions={{
                  color: selected === index ? "red" : "",
                  opacity: selected === index ? 1 : 0,
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
