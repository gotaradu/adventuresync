import CircularProgress from "@mui/material/CircularProgress";
import CustomContainer from "./CustomContainer";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { gridItemProps } from "../css/home";
import Athlete from "../models/Athlete";
import { ipAddress } from "../context/ipAddreses";
import { EAuthState } from "../utils/types";
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { useEffect } from "react";
import { setAuthState } from "../context/authSlice";

export default function SignInSide() {
  const { authState, athlete } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = `http://www.strava.com/oauth/authorize?client_id=115322&response_type=code&redirect_uri=${ipAddress}:8080/exchange_token&approval_prompt=force&scope=read_all,activity:read_all`;
  };

  const handleActivities = () => {
    navigate("/activities");
  };

  const checkAuth = async () => {
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
      dispatch(
        setAuthState({ authState: EAuthState.Error, athlete: undefined })
      );
    }
  };

  const defaultTheme = createTheme();

  useEffect(() => {
    console.log(authState);
    if (authState !== EAuthState.User) checkAuth();
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#607274",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {!athlete ? (
          authState == EAuthState.Loading ? (
            <Grid {...gridItemProps}>
              <CustomContainer>
                <CircularProgress sx={{ color: "#607274" }} />
              </CustomContainer>
            </Grid>
          ) : (
            <Grid {...gridItemProps}>
              <CustomContainer>
                <CustomButton handleOnClick={handleLogin}>
                  Login with Strava
                </CustomButton>
              </CustomContainer>
            </Grid>
          )
        ) : (
          <Grid {...gridItemProps}>
            <CustomContainer>
              {authState != EAuthState.Loading ? (
                <div style={{ textAlign: "center" }}>
                  <h1>Bun venit, {athlete.firstname}!</h1>
                  <CustomButton handleOnClick={handleActivities}>
                    Activities
                  </CustomButton>
                </div>
              ) : (
                <CustomContainer>
                  <CircularProgress sx={{ color: "#607274" }} />
                </CustomContainer>
              )}
            </CustomContainer>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}
