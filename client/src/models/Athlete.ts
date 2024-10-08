export interface Athlete {
  id: string;
  country: string;
  sex: string;
  resource_state: number;
  firstname: string;
  lastname: string;
}

export interface ApiResp {
  data: Athlete;
  message: string;
}
