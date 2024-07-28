import { Dispatch } from "react";
import { setActivitiesState } from "../context/activitiesSlice";
import { setAuthState } from "../context/authSlice";
import { handleNewData } from "./activities";
import { mockActivities } from "./mockData";
import { ActivityState, EActivitiesState, EAuthState } from "./types";
import { UnknownAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

export const handleOnRender = async (dispatch: (action: any) => void, navigate: NavigateFunction) => {
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


export const handleSingleActivityMock = async (navigate: NavigateFunction, activityId: string | undefined, dispatch: Dispatch<UnknownAction>, useCustomState: React.Dispatch<React.SetStateAction<ActivityState>>) => {
    const visitor = await localStorage.getItem("visitor");
    console.log(visitor)
    if (visitor) {
        dispatch(
            setAuthState({
                authState: EAuthState.Visitor,
                athlete: undefined,
                message: "",
            })
        );

        const mockActivity = handleNewData(mockActivities).find(activity => activity.id === activityId)
        useCustomState((prevState) => ({
            ...prevState,
            activity: mockActivity,
            altitudeStream: null,
            fetchError: "",
        }));
        return;
    }

}