import { useEffect } from "react";

import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { EActivitiesState, EAuthState } from "../utils/types";
import { fetchActivities, handleAllActivities } from "../utils/activities";
import { checkAuth } from "../utils/auth";

import { columns } from "../utils/stats";
import { CustomLoading } from "../components/CustomLoading";

export const StatsPage = () => {
  const navigate = useNavigate();
  const { authState } = useSelector((state: RootState) => state.auth);
  const { activitiesState, activities } = useSelector(
    (state: RootState) => state.activities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleAllActivities(authState, activitiesState, navigate, dispatch);
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
    else return <CustomLoading />;
  };
  return render();
};
