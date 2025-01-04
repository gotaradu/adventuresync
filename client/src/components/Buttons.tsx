import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { logout } from "../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { EAuthState } from "../utils/types";

const Buttons: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authState } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <CustomButton handleOnClick={() => navigate("/")}>Home</CustomButton>
      {authState !== EAuthState.Visitor ? (
        <CustomButton handleOnClick={() => navigate("/activities")}>
          Activities
        </CustomButton>
      ) : (
        <CustomButton handleOnClick={() => navigate("/activities-mock")}>
          Activities
        </CustomButton>
      )}
      {authState !== EAuthState.Visitor ? (
        <CustomButton handleOnClick={() => navigate("/stats")}>
          Stats
        </CustomButton>
      ) : (
        <CustomButton handleOnClick={() => navigate("/stats-mock")}>
          Stats
        </CustomButton>
      )}
      {authState !== EAuthState.Visitor && (
        <CustomButton handleOnClick={() => logout(dispatch)}>
          Logout
        </CustomButton>
      )}
    </>
  );
};

export default Buttons;
