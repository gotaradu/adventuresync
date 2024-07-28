import { CircularProgress } from "@mui/material";
import CenteredContent from "./CenteredContent";

export const CustomLoading: React.FC = () => {
  return (
    <CenteredContent>
      <CircularProgress />
    </CenteredContent>
  );
};
