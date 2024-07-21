import DrawedActivity from "../models/DrawedActivity";
import { LatLng, Map } from "leaflet";
import L from "leaflet";
import "../css/popup.css";
import { MutableRefObject } from "react";

export const arrayToLatLng = (coords: [number, number]) => {

  if (coords.length === 2) return new LatLng(coords[0], coords[1]);
  return new LatLng(0, 0);
};

function createPopupContent(activity: DrawedActivity) {
  const container = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = activity.name;
  container.appendChild(title);

  const location = document.createElement("p");
  location.textContent = activity.distance.toString() + " km";
  container.appendChild(location);

  const idElement = document.createElement("div");
  idElement.textContent = `ID: ${activity.id}`;
  container.appendChild(idElement);

  const button = document.createElement("button");
  button.textContent = "See stats";
  button.className = "popup-button";
  container.appendChild(button);

  return container;
}

const mapZoomHandler = async (
  activity: DrawedActivity,
  map: Map,
  popupRef: MutableRefObject<L.Popup | null>
) => {
  map.eachLayer((layer) => {
    if (layer instanceof L.Popup) {
      map.removeLayer(layer);
    }
  });

  if (activity.startLatLng.length === 2) {
    const latlng: LatLng = new LatLng(
      activity.startLatLng[0],
      activity.startLatLng[1]
    );

    const popup = new L.Popup(latlng)
      .setContent(createPopupContent(activity))
      .addTo(map);
    popup.openPopup();

    popupRef.current = popup;

    map.setView(activity.startLatLng, 18);

    const onZoomEnd = () => {
      map.off("zoomend", onZoomEnd);
    };
    map.on("zoomend", onZoomEnd);
  }
};

export { mapZoomHandler };
