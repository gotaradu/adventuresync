export default interface Activity {
  id: string;
  athleteId: string;
  name: string;
  map: string,
  distance: number;
  averageSpeed: number;
  sportType: string;
  startDate: Date;
  averageHeartRate: number;
  maxHeartRate: number;
  elapsedTime: number;
  totalElevationGain: number;
  elevHigh: number;
  elevLow: number;
  startLatLng: [number, number];
}
