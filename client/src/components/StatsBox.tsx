import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { columns } from "../utils/stats";
import DrawedActivity from "../models/DrawedActivity";

export const StatsBox: React.FC<{ activities: DrawedActivity[] }> = ({
  activities,
}) => {
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
};
