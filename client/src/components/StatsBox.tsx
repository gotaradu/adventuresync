import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { columns } from "../utils/stats";
import DrawedActivity from "../models/DrawedActivity";

export const StatsBox: React.FC<{ activities: DrawedActivity[] }> = ({
  activities,
}) => {
  return (
    <Box>
      <DataGrid
        rows={activities}
        columns={columns}
        autoHeight
        autosizeOnMount
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[15]}
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};
