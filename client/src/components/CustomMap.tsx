import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useState } from "react";
import CustomContainer from "./CustomContainer";
import { Container, width } from "@mui/system";

const LocationMarker: React.FC = () => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      console.log(e);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default function CustomMap() {
  return (
    <MapContainer
      center={[46.776069, 23.619047]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
