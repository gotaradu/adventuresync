import DrawedActivity from "../models/DrawedActivity";
import { icon } from "../utils/icons";
import {
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
export const CustomActivity: React.FC<{
  activity: DrawedActivity;
  altitude: any;
}> = ({ activity, altitude }) => {
  console.log(altitude[0]);
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h2">
            {activity?.name}
          </Typography>

          <Divider style={{ margin: "20px 0" }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Distance"
                    secondary={`${activity?.distance} meters`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Average Heart Rate"
                    secondary={`${activity?.averageHeartRate} bpm`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Max Heart Rate"
                    secondary={`${activity?.maxHeartRate} bpm`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Elapsed Time"
                    secondary={`${activity?.elapsedTime} seconds`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Total Elevation Gain"
                    secondary={`${activity?.totalElevationGain} meters`}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Elevation High"
                    secondary={`${activity?.elevHigh} meters`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Elevation Low"
                    secondary={`${activity?.elevLow} meters`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Sport Type"
                    secondary={activity?.sportType}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Average Speed"
                    secondary={`${activity?.averageSpeed} m/s`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Start Coordinates"
                    secondary={`[${activity?.startLatLng.join(", ")}]`}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {activity.mapExists && (
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
      )}
      <Card>
        <CardContent>
          <LineChart
            title="Altitude"
            xAxis={[
              {
                data: altitude[0].data,
              },
            ]}
            series={[
              {
                data: altitude[1].data,
                showMark: false,
              },
            ]}
            height={400}
          />
        </CardContent>
      </Card>
    </Container>
  );
};
