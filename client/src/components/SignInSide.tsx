import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CustomContainer from "./CustomContainer";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Athlete from "../models/Athlete";
import { Button } from "@mui/material";
import { gridItemProps } from "../css/home";
import { useAuth } from "../context/AuthProvider";

export default function SignInSide() {
  const {
    athlete,
    isLoggedIn,
    role,
    loading,
    setLoggedIn,
    setRole,
    checkAuth,
    setLoading,
  } = useAuth();

  const handleLogin = () => {
    setLoading(true);
    window.location.href =
      "http://www.strava.com/oauth/authorize?client_id=115322&response_type=code&redirect_uri=http://192.168.179.5:8080/exchange_token&approval_prompt=force&scope=read_all,activity:read_all";
  };

  const handleActivities = () => {
    setLoading(true);
    window.location.href = "/activities";
  };

  const defaultTheme = createTheme();

  useEffect(() => {
    checkAuth();
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
          loading ? (
            <Grid {...gridItemProps}>
              <CustomContainer>
                <CircularProgress sx={{ color: "#607274" }} />
              </CustomContainer>
            </Grid>
          ) : (
            <Grid {...gridItemProps}>
              <CustomContainer>
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: "#607274",
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#9E9FA5",
                    },
                  }}
                >
                  Login with Strava
                </Button>
              </CustomContainer>
            </Grid>
          )
        ) : (
          <Grid {...gridItemProps}>
            <CustomContainer>
              {!loading ? (
                <div style={{ textAlign: "center" }}>
                  <h1>Bun venit, {athlete.firstname}!</h1>
                  <Button
                    variant="contained"
                    onClick={handleActivities}
                    sx={{
                      backgroundColor: "#607274",
                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: "#9E9FA5",
                      },
                    }}
                  >
                    Activities
                  </Button>
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
