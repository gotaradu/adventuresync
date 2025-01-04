import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { EAuthState } from "../utils/types";
import {
  ButtonGroup,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import BarChartIcon from "@mui/icons-material/BarChart";
import compStrava from "../css/images/comp_strava.png";
const Buttons: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { authState } = useSelector((state: RootState) => state.auth);

  const handleMenuClick = (path: string) => navigate(path);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        margin: "10px",
        border: "none",
      }}
    >
      {isMobile ? (
        <>
          <IconButton
            onClick={() => handleMenuClick("/")}
            color="secondary"
            sx={{
              backgroundColor: theme.palette.background.default,
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              "& svg": {
                fontSize: "30px",
              },
            }}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              handleMenuClick(
                authState !== EAuthState.Visitor
                  ? "/activities"
                  : "/activities-mock"
              )
            }
            color="secondary"
            sx={{
              backgroundColor: theme.palette.background.default,
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              "& svg": {
                fontSize: "30px",
              },
            }}
          >
            <FitnessCenterIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              handleMenuClick(
                authState !== EAuthState.Visitor ? "/stats" : "/stats-mock"
              )
            }
            color="primary"
            sx={{
              backgroundColor: theme.palette.background.default,
              border: `2px solid ${theme.palette.secondary.main}`,
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              "& svg": {
                fontSize: "30px",
              },
            }}
          >
            <BarChartIcon />
          </IconButton>
          {authState !== EAuthState.Visitor && (
            <IconButton
              onClick={() => logout(dispatch)}
              color="primary"
              sx={{
                backgroundColor: theme.palette.background.default,
                border: `2px solid ${theme.palette.secondary.main}`,
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                "& svg": {
                  fontSize: "30px",
                },
              }}
            >
              <LogoutIcon />
            </IconButton>
          )}
        </>
      ) : (
        <ButtonGroup
          variant="contained"
          sx={{
            gap: "10px",
            "& .MuiButton-root": {
              border: "none",
            },
          }}
        >
          <Button
            onClick={() => handleMenuClick("/")}
            color="primary"
            sx={{
              backgroundColor: theme.palette.primary.main,
              border: "none",
            }}
          >
            <HomeIcon />
            Home
          </Button>
          <Button
            onClick={() =>
              handleMenuClick(
                authState !== EAuthState.Visitor
                  ? "/activities"
                  : "/activities-mock"
              )
            }
            color="primary"
            sx={{
              backgroundColor: theme.palette.primary.main,
              border: "none",
            }}
          >
            <FitnessCenterIcon />
            Activities
          </Button>
          <Button
            onClick={() =>
              handleMenuClick(
                authState !== EAuthState.Visitor ? "/stats" : "/stats-mock"
              )
            }
            color="secondary"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              border: 0,
            }}
          >
            <BarChartIcon />
            Stats
          </Button>
          {authState !== EAuthState.Visitor && (
            <Button
              onClick={() => logout(dispatch)}
              color="secondary"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                border: "none",
              }}
            >
              <LogoutIcon />
              Logout
            </Button>
          )}
        </ButtonGroup>
      )}
    </Box>
  );
};

export default Buttons;
