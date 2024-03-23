import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CustomContainer from "./CustomContainer";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Athlete from "../models/Athlete";
import { Button } from "@mui/material";
import { gridItemProps } from "../css/home";
export default function SignInSide() {
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    setLoading(true);
    window.location.href =
      "http://www.strava.com/oauth/authorize?client_id=115322&response_type=code&redirect_uri=http://192.168.1.147:8080/exchange_token&approval_prompt=force&scope=read";
  };

  const defaultTheme = createTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.1.147:8080/home", {
          method: "GET",
          headers: {
            Origin: "http://192.168.1.147:3000",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: Athlete = await response.json();

        setAthlete(data);
        setLoading(false);
      } catch (error) {
        console.error("Alte erori:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {!athlete ? (
          loading ? (
            <Grid {...gridItemProps}>
              <CustomContainer>
                <CircularProgress />
              </CustomContainer>
            </Grid>
          ) : (
            <Grid {...gridItemProps}>
              <CustomContainer>
                <Button variant="contained" onClick={handleClick}>
                  Login with Strava
                </Button>
              </CustomContainer>
            </Grid>
          )
        ) : (
          <Grid {...gridItemProps}>
            <CustomContainer>
              <h1>Bun venit, {athlete.firstname}!</h1>
            </CustomContainer>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
}
