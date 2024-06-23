import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IActivitiesState, EActivitiesState } from "../utils/types";

const initialActivitiesState: IActivitiesState = {
  activitiesState: EActivitiesState.Idle,
  activities: [],
  selected: -1,
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState: initialActivitiesState,
  reducers: {
    setActivitiesState(state, action: PayloadAction<IActivitiesState>) {
      state.activitiesState = action.payload.activitiesState;
      state.activities = action.payload.activities;
    },
    setSelected(state, action: PayloadAction<number>) {
      state.selected = action.payload;
    },
  },
});

export const { setActivitiesState, setSelected } = activitiesSlice.actions;

export default activitiesSlice.reducer;
