import { setActivitiesState } from "../context/activitiesSlice";
import { setAuthState } from "../context/authSlice";
import { handleNewData } from "./activities";
import { mockActivities } from "./mockData";
import { EActivitiesState, EAuthState } from "./types";

export const handleOnRender = async (dispatch: (action: any) => void, navigate: (path: string) => void) => {
    const visitor = await localStorage.getItem("visitor");
    if (visitor) {
        dispatch(
            setAuthState({
                authState: EAuthState.Visitor,
                athlete: undefined,
                message: "",
            })
        );
        dispatch(
            setActivitiesState({
                activitiesState: EActivitiesState.Fetched,
                activities: handleNewData(mockActivities),
                selected: -1,
            })
        );
        return;
    } else {
        navigate("/");
    }
};


