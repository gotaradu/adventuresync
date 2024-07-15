import { ipAddress } from "../context/config/ipAddreses";
import { EAuthState } from "../utils/types";
import { ApiResp } from "../models/Athlete";
import { setAuthState } from "../context/authSlice";

export const checkAuth = async (dispatch: any) => {
  try {
    const response = await fetch(`${ipAddress}:8080/home`, {
      method: "GET",
      headers: {
        Origin: `${ipAddress}:3000`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const data: ApiResp = await response.json();
      dispatch(
        setAuthState({
          authState: EAuthState.User,
          athlete: data.data,
          message: "Authenticated",
        })
      );
    } else if (response.status === 403)
      dispatch(
        setAuthState({
          authState: EAuthState.Forbidden,
          athlete: undefined,
          message: "Forbidden",
        })
      );
    else if (response.status === 400)
      dispatch(
        setAuthState({
          authState: EAuthState.Unauthorized,
          athlete: undefined,
          message: "Unauthorized",
        })
      );
    else
      dispatch(
        setAuthState({
          authState: EAuthState.Guest,
          athlete: undefined,
          message: "Guest",
        })
      );
  } catch (error) {
    console.log(error);
    dispatch(
      setAuthState({
        authState: EAuthState.Error,
        athlete: undefined,
        message: "Error on the server",
      })
    );
  }
};
