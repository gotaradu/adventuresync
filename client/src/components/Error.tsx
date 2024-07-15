import CenteredContent from "../components/CenteredContent";
import CustomButton from "../components/CustomButton";
import CustomContainer from "../components/CustomContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";
import { gridItemProps } from "../css/home";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthState } from "../context/authSlice";
import { EAuthState } from "../utils/types";
export default function Error() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReturn = () => {
    dispatch(
      setAuthState({
        authState: EAuthState.Guest,
        athlete: undefined,
        message: "",
      })
    );
    navigate("/");
  };
  return (
    <Grid container>
      <Grid {...gridItemProps}>
        <CustomContainer>
          <h1>Something went wrong</h1>
        </CustomContainer>
      </Grid>

      <Grid {...gridItemProps} sx={{ backgroundColor: "#CCCCCC" }}>
        <CustomContainer>
          <CustomButton handleOnClick={handleReturn}>
            Return to main page
          </CustomButton>
        </CustomContainer>
      </Grid>
    </Grid>
  );
}
