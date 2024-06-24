import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { gridItemProps } from "../css/home";
import { ipAddress } from "../context/ipAddreses";
import { EAuthState, IAuthState } from "../utils/types";
import CustomButton from "../components/CustomButton";
import CustomContainer from "../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { useEffect } from "react";
import { checkAuth } from "../utils/auth";
import { setAuthState } from "../context/authSlice";

export default function HomePage() {
  const { authState, athlete } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.clear();
    window.location.href = `http://www.strava.com/oauth/authorize?client_id=115322&response_type=code&redirect_uri=${ipAddress}:8080/exchange_token&approval_prompt=force&scope=read_all,activity:read_all`;
  };

  const handleMock = () => {
    localStorage.setItem("visitor", "true");
    dispatch(
      setAuthState({ authState: EAuthState.Visitor, athlete: undefined })
    );
    navigate("/activities");
  };

  const handleActivities = () => {
    navigate("/activities");
  };

  const defaultTheme = createTheme();

  useEffect(() => {
    if (authState !== EAuthState.User) checkAuth(dispatch);
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
                <CustomButton handleOnClick={handleMock}>
                  with Custom data
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
