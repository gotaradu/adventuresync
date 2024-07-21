import { LatLng } from "leaflet";

export default interface DrawedActivity {
  id: string;
  athleteId: string;
  index: number;
  mapExists: boolean;
  mapString: string;
  name: string;
  pointsa: LatLng[];
  distance: number;
  sportType: string;
  startDate: Date;
  averageHeartRate: number;
  averageSpeed: string;
  maxHeartRate: number;
  elapsedTime: string;
  totalElevationGain: number;
  elevHigh: number;
  elevLow: number;
  startLatLng: [number, number];
}
