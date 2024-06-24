// authUtils.ts

import { ipAddress } from "../context/ipAddreses";
import { EAuthState } from "../utils/types";
import Athlete from "../models/Athlete";
import { setAuthState } from "../context/authSlice";

export const checkAuth = async (dispatch: any) => {
  console.log("called");
  try {
    const response = await fetch(`${ipAddress}:8080/home`, {
      method: "GET",
      headers: {
        Origin: `${ipAddress}:3000`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      dispatch(
        setAuthState({ authState: EAuthState.Error, athlete: undefined })
      );
      throw new Error("error when fetching");
    }
    const data: Athlete = await response.json();
    dispatch(setAuthState({ authState: EAuthState.User, athlete: data }));
  } catch (error) {
    console.error("Alte erori:", error);
    dispatch(setAuthState({ authState: EAuthState.Error, athlete: undefined }));
  }
};
