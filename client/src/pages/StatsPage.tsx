import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { EActivitiesState, EAuthState } from "../utils/types";
import { fetchActivities, getAllActivities } from "../utils/activities";
import { checkAuth } from "../utils/auth";
import CenteredContent from "../components/CenteredContent";
import { CircularProgress } from "@mui/material";
import { columns } from "../utils/stats";

export const StatsPage = () => {
  const navigate = useNavigate();
  const { authState } = useSelector((state: RootState) => state.auth);
  const { activitiesState, activities } = useSelector(
    (state: RootState) => state.activities
  );
  const dispatch = useDispatch();

  const handleOnRender = async () => {
    if (
      authState === EAuthState.Error ||
      activitiesState === EActivitiesState.Error ||
      authState === EAuthState.Forbidden ||
      authState === EAuthState.Unauthorized
    )
      navigate("/");
    if (authState === EAuthState.User) {
      if (activitiesState !== EActivitiesState.Fetched) {
        await getAllActivities(dispatch);
      }
      return;
    }

    if (authState === EAuthState.Guest) {
      await checkAuth(dispatch);
      return;
    }
  };
  React.useEffect(() => {
    handleOnRender();
  }, [authState, activitiesState, checkAuth, fetchActivities]);

  const render = () => {
    if (
      authState === EAuthState.User &&
      activitiesState === EActivitiesState.Fetched
    )
      return (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={activities}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            autoHeight
            autosizeOnMount
            slots={{
              toolbar: GridToolbar,
            }}
          />
        </Box>
      );
    else
      return (
        <CenteredContent>
          <CircularProgress />
        </CenteredContent>
      );
  };
  return render();
};
