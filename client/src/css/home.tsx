import { GridSize } from "@mui/material";

interface GridItemProps {
  item?: boolean;
  xs?: GridSize;
  sm?: GridSize;
  container?: boolean;
  justifyContent?: string;
  alignItems?: string;
}
const gridItemProps: GridItemProps = {
  item: true,
  xs: 12,
  sm: 6,
  container: true,
  justifyContent: "center",
  alignItems: "center",
};
export { gridItemProps };
