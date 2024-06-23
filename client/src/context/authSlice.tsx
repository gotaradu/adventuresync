import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EAuthState, IAuthState } from "../utils/types";

const initialAuthState: IAuthState = {
  authState: EAuthState.Guest,
  athlete: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuthState(state, action: PayloadAction<IAuthState>) {
      state.authState = action.payload.authState; // "mutate state" but toolkit does all the magic
      state.athlete = action.payload.athlete;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
