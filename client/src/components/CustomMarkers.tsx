import { useMap, Marker } from "react-leaflet";
import React, { MutableRefObject, useEffect, useMemo } from "react";
import { icon } from "../utils/icons";
import DrawedActivity from "../models/DrawedActivity";
import { mapZoomHandler } from "../utils/handleMap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { arrayToLatLng } from "../utils/handleMap";
import { setSelected } from "../context/activitiesSlice";
import { Map } from "leaflet";
import { useNavigate } from "react-router-dom";

const CustomMarkers: React.FC<{
  popupRef: MutableRefObject<L.Popup | null>;
  path: string;
}> = ({ popupRef, path }) => {
  const map = useMap();
  const navigate = useNavigate();
  const { activities } = useSelector((state: RootState) => state.activities);
  const dispatch = useDispatch();

  const clickHandler = async (
    activity: DrawedActivity,
    map: Map,
    index: number
  ) => {
    await mapZoomHandler(activity, map, popupRef);
    dispatch(setSelected(index));
    const element = popupRef.current?.getElement();
    if (element) {
      const button = element.querySelector<HTMLButtonElement>(".popup-button");
      if (button) {
        button.onclick = () => {
          navigate(`/${path}/${activity.id}`);
        };
      }
    }
  };

  useEffect(() => {
    dispatch(setSelected(-1));
  }, []);

  const positions = useMemo(() => {
    return activities.map((activity: DrawedActivity) =>
      arrayToLatLng(activity.startLatLng)
    );
  }, [activities]);

  return (
    <>
      {activities &&
        activities.map((activity: DrawedActivity, index: number) => {
          return (
            activity.mapExists &&
            activity.pointsa &&
            activity.pointsa.length > 0 && (
              <Marker
                key={activity.id}
                riseOnHover
                riseOffset={index}
                icon={icon(activity.sportType)}
                position={positions[index]}
                eventHandlers={{
                  click: () => {
                    clickHandler(activity, map, index);
                  },
                }}
              />
            )
          );
        })}
    </>
  );
};

export default CustomMarkers;
