import { GridColDef } from "@mui/x-data-grid";
import DrawedActivity from '../models/DrawedActivity';
const timeToMinutes = (time: string) => {
    if (!time) return Infinity;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

const compareTimes = (time1: string, time2: string) => {
    return timeToMinutes(time1) - timeToMinutes(time2);
};

export const columns: GridColDef<(DrawedActivity[])[number]>[] = [
    { field: "id", headerName: "ID", width: 140 },
    {
        field: "athleteId",
        headerName: "Athlete ID",
        width: 150,
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
        field: "startLatLng",
        headerName: "Start LatLng",
        width: 200,
        renderCell: (params) => {
            const [lat, lng] = (params.value as [number, number]) || [];
            return lat && lng ? `[${lat.toFixed(2)}, ${lng.toFixed(2)}]` : "N/A";
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
