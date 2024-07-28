import { Card, CardContent, Typography } from "@mui/material";
import { icon } from "../../utils/icons";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import DrawedActivity from "../../models/DrawedActivity";

export const CustomMiniMap: React.FC<{ activity: DrawedActivity }> = ({
  activity,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h3">
          Activity Map
        </Typography>
        {activity?.startLatLng && (
          <MapContainer
            style={{ height: "400px", width: "100%" }}
            center={[activity.startLatLng[0], activity.startLatLng[1]]}
            zoom={16}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Polyline
              pathOptions={{
                color: "red",
              }}
              positions={activity.pointsa}
              smoothFactor={10}
            />
            <Marker
              riseOnHover
              icon={icon(activity.sportType)}
              position={activity.startLatLng}
            />
          </MapContainer>
        )}
      </CardContent>
    </Card>
  );
};
