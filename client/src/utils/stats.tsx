import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DrawedActivity from "../models/DrawedActivity";

const timeToMinutes = (time: string) => {
  if (!time) return Infinity;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const compareTimes = (time1: string, time2: string) => {
  return timeToMinutes(time1) - timeToMinutes(time2);
};

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 300,
    renderCell: (params: any) => {
      const stravaUrl = `https://www.strava.com/activities/${params.id}`;
      return (
        <a href={stravaUrl} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      );
    },
  },

  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "distance",
    headerName: "Distance (km)",
    type: "number",
    width: 150,
  },
  {
    field: "averageHeartRate",
    headerName: "Average Heartrate (bpm)",
    type: "number",
    width: 150,
  },
  {
    field: "maxHeartRate",
    headerName: "Max Heartrate (bpm)",
    type: "number",
    width: 150,
  },
  {
    field: "totalElevationGain",
    headerName: "Elevation (m)",
    type: "number",
    width: 110,
  },
  {
    field: "elevHigh",
    headerName: "High Elevation (m)",
    type: "number",
    width: 110,
  },
  {
    field: "elevLow",
    headerName: "Low Elevation (m)",
    type: "number",
    width: 110,
  },

  {
    field: "sportType",
    headerName: "Sport Type",
    width: 150,
  },
  {
    field: "elapsedTime",
    headerName: "Elapsed Time",
    width: 150,
  },
  {
    field: "startDate",
    headerName: "Date",
    type: "string",
    width: 200,
    valueGetter: (value: string) => {
      if (!value) {
        return value;
      }

      return value.substring(0, 10);
    },
  },

  {
    field: "averageSpeed",
    headerName: "Average Speed (pace)",
    type: "string",
    width: 150,
    sortComparator: compareTimes,
  },
];
