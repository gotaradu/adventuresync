import CustomButton from "../components/CustomButton";
import CustomContainer from "../components/CustomContainer";
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
  const error = query.get("errorMessage");

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
    <CustomContainer background="linear-gradient(135deg, #607274, #BAB86C)">
      <div style={{ textAlign: "center" }}>
        <h1>
          {" "}
          {message.length > 0
            ? message + " " + (error ? error : "")
            : "There is no active error" + " " + (error ? error : "")}
        </h1>
      </div>

      <CustomButton handleOnClick={handleReturn}>
        Return to main page
      </CustomButton>
    </CustomContainer>
  );
};
