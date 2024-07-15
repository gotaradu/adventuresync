import { useMap, Marker } from "react-leaflet";
import React from "react";
import { icon } from "../utils/icons";
import DrawedActivity from "../models/DrawedActivity";
import { mapZoomHandler } from "../utils/handleMap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { arrayToLatLng } from "../utils/handleMap";
import { v4 as uuidv4 } from "uuid";
import { setSelected } from "../context/activitiesSlice";

const CustomMarkers: React.FC = () => {
  const map = useMap();
  const { activities } = useSelector((state: RootState) => state.activities);
  const dispatch = useDispatch();

  return (
    <>
      {activities &&
        activities.map(
          (activity: DrawedActivity, index: number) =>
            activity.mapExists &&
            activity.pointsa &&
            activity.pointsa.length > 0 && (
              <Marker
                key={uuidv4()}
                riseOnHover
                riseOffset={index}
                icon={icon(activity.sport_type)}
                position={arrayToLatLng(activity.start_latlng)}
                eventHandlers={{
                  click: () => {
                    mapZoomHandler(activity, map);
                    dispatch(setSelected(index));
                    console.log(activity.sport_type);
                  },
                }}
              />
            )
        )}
    </>
  );
};

export default CustomMarkers;
