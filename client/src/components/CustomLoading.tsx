import { CircularProgress } from "@mui/material";
import CenteredContent from "./CenteredContent";
import CustomContainer from "./CustomContainer";

export const CustomLoading: React.FC = () => {
  return (
    <CustomContainer background="linear-gradient(135deg, #607274, #BAB86C)">
      <CenteredContent>
        <CircularProgress />
      </CenteredContent>
    </CustomContainer>
  );
};
