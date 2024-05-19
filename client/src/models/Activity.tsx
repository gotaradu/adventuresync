import { LatLngExpression } from "leaflet";

export default interface Activity {
  name: string;
  map: {
    id: string;
    summary_polyline: string;
    resource_state: number;
  };
  distance: number;
  sport_type: string;
  start_date: Date;
  location_city: string;
  location_country: string;
  average_heartrate: number;
  max_heartrate: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  elev_high: number;
  elev_low: number;
  start_latlng: LatLngExpression;
}
