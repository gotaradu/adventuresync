import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#607274",
    },
    secondary: {
      main: "#BAB86C",
    },
    background: {
      default: "#F4s114",
    },
    text: {
      primary: "#6072s4",
      secondary: "#BAB86C",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default customTheme;
