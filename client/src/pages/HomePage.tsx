import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Error from "../components/Error";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { gridItemProps } from "../css/home";
import { ipAddress } from "../context/config/ipAddreses";
import { EAuthState } from "../utils/types";
import CustomButton from "../components/CustomButton";
import CustomContainer from "../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { useEffect, useState } from "react";
import { checkAuth } from "../utils/auth";
import { setAuthState } from "../context/authSlice";

export default function HomePage() {
  const { authState, athlete } = useSelector((state: RootState) => state.auth);
  const [isChecking, setIsChecking] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.clear();
    window.location.href = `http://www.strava.com/oauth/authorize?client_id=115322&response_type=code&redirect_uri=${ipAddress}:8080/exchange_token&approval_prompt=force&scope=read_all,activity:read_all`;
  };

  const handleMock = () => {
    localStorage.setItem("visitor", "true");
    dispatch(
      setAuthState({
        authState: EAuthState.Visitor,
        athlete: undefined,
        message: "",
      })
    );
    navigate("/activities");
  };

  const handleActivities = () => {
    navigate("/activities");
  };

  const defaultTheme = createTheme();

  useEffect(() => {
    console.log("called");
    const timeoutId = setTimeout(() => {
      setIsChecking(false);
    }, 100);

    if (authState !== EAuthState.User && authState !== EAuthState.Visitor) {
      checkAuth(dispatch);
    }
    return () => clearTimeout(timeoutId);
  }, [authState, dispatch]);
  const handleView = () => {
    if (isChecking)
      return (
        <Grid {...gridItemProps}>
          <CustomContainer>
            <CircularProgress sx={{ color: "#607274" }} />
          </CustomContainer>
        </Grid>
      );
    else if (athlete && authState === EAuthState.User)
      return (
        <Grid {...gridItemProps}>
          <CustomContainer>
            <div style={{ textAlign: "center" }}>
              <h1>Bun venit, {athlete.firstname}!</h1>
              <CustomButton handleOnClick={handleActivities}>
                Activities
              </CustomButton>
            </div>
          </CustomContainer>
        </Grid>
      );
    else if (!athlete && authState === EAuthState.Error) return <Error />;
    else if (
      authState === EAuthState.Guest ||
      authState === EAuthState.Forbidden ||
      authState === EAuthState.Unauthorized ||
      authState === EAuthState.Visitor
    ) {
      return (
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
      );
    }
  };
  const renderPage = () => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              backgroundRepeat: "no-repeat",
              backgroundColor: "#607274",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* {!athlete && authState === EAuthState.Loading && (
            <Grid {...gridItemProps}>
              <CustomContainer>
                <CircularProgress sx={{ color: "#607274" }} />
              </CustomContainer>
            </Grid>
          )}

          {athlete && authState === EAuthState.User && (
            <Grid {...gridItemProps}>
              <CustomContainer>
                <div style={{ textAlign: "center" }}>
                  <h1>Bun venit, {athlete.firstname}!</h1>
                  <CustomButton handleOnClick={handleActivities}>
                    Activities
                  </CustomButton>
                </div>
              </CustomContainer>
            </Grid>
          )}

          {!athlete && authState === EAuthState.Error && <Error />}

          {(authState === EAuthState.Guest ||
            authState === EAuthState.Forbidden ||
            authState === EAuthState.Unauthorized ||
            authState === EAuthState.Visitor) && (
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
          )} */}
          {handleView()}
        </Grid>
      </ThemeProvider>
    );
  };

  return renderPage();
}
