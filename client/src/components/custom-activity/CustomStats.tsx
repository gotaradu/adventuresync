import {
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DrawedActivity from "../../models/DrawedActivity";

export const CustomStats: React.FC<{ activity: DrawedActivity }> = ({
  activity,
}) => {
  return (
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
                  secondary={`${activity?.distance} km`}
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
                  secondary={`${activity?.elapsedTime} `}
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
                  secondary={`${activity?.averageSpeed} min/km`}
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
  );
};
