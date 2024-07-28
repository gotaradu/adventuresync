import CustomButton from "../components/CustomButton";
import CustomContainer from "../components/CustomContainer";
import { Grid } from "@mui/material";
import { gridItemProps } from "../css/home";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthState } from "../context/authSlice";
import { EAuthState } from "../utils/types";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Error: React.FC<{ message: string }> = ({ message }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = useQuery();
  const error = query.get("error");

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
          <h1>{message + " " + (error ? error : "")}</h1>
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
};
