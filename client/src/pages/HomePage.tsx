import { Error } from "../components/Error";
import { useNavigate } from "react-router-dom";
import { ipAddress } from "../context/config/ipAddreses";
import { EAuthState } from "../utils/types";
import CustomButton from "../components/CustomButton";
import CustomContainer from "../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { useEffect, useState } from "react";
import { checkAuth } from "../utils/auth";
import { setAuthState } from "../context/authSlice";
import { CustomLoading } from "../components/CustomLoading";
import "../css/home.css";
import Buttons from "../components/Buttons";

export const HomePage: React.FC = () => {
  const { authState, athlete } = useSelector((state: RootState) => state.auth);
  const [isChecking, setIsChecking] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [canShowWelcome, setCanShowWelcome] = useState(false);

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
    navigate("/activities-mock");
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsChecking(false);
    }, 300);

    if (authState !== EAuthState.User && authState !== EAuthState.Visitor) {
      checkAuth(dispatch);
    }

    if (
      authState === EAuthState.Guest ||
      authState === EAuthState.Forbidden ||
      authState === EAuthState.Unauthorized ||
      authState === EAuthState.Visitor
    ) {
      setTimeout(() => {
        setCanShowWelcome(true);
      }, 1500);
    }
    return () => clearTimeout(timeoutId);
  }, [authState, dispatch]);

  const handleView = () => {
    if (isChecking || (!canShowWelcome && !athlete))
      return (
        <CustomContainer background="linear-gradient(135deg, #607274, #BAB86C)">
          <CustomLoading />
        </CustomContainer>
      );
    else if (athlete && authState === EAuthState.User) {
      return (
        <>
          <CustomContainer background="linear-gradient(135deg, #607274, #BAB86C)">
            <div className="adventure-text" style={{ color: "#BAB86C" }}>
              Adventure
            </div>
            <div className="adventure-text" style={{ color: "#607274" }}>
              Sync
            </div>
            <Buttons />
          </CustomContainer>
        </>
      );
    } else if (!athlete && authState === EAuthState.Error)
      return <Error message="Something went wrong" />;
    else if (
      canShowWelcome &&
      (authState === EAuthState.Guest ||
        authState === EAuthState.Forbidden ||
        authState === EAuthState.Unauthorized ||
        authState === EAuthState.Visitor)
    ) {
      return (
        <CustomContainer background="linear-gradient(135deg, #607274, #BAB86C)">
          <div className="adventure-text" style={{ color: "#BAB86C" }}>
            Adventure
          </div>
          <div className="adventure-text" style={{ color: "#607274" }}>
            Sync
          </div>
          <CustomButton handleOnClick={handleLogin}>
            Login with Strava
          </CustomButton>
          <CustomButton handleOnClick={handleMock}>
            with Custom data
          </CustomButton>
        </CustomContainer>
      );
    }
  };

  return <>{handleView()}</>;
};
