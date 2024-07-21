import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../context/store";

import { EActivitiesState, EAuthState } from "../utils/types";

import { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import CenteredContent from "../components/CenteredContent";
import { columns } from "../utils/stats";
import { handleOnRender } from "../utils/visitor";

export const StatsPageMock: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useSelector((state: RootState) => state.auth);
  const { activitiesState, activities } = useSelector(
    (state: RootState) => state.activities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleOnRender(dispatch, navigate);
  }, [authState, activitiesState]);

  const render = () => {
    if (
      authState === EAuthState.Visitor &&
      localStorage.getItem("visitor") &&
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
