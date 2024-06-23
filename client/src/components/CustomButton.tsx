import { Button } from "@mui/material";
export default function CustomButton(props: any) {
  return (
    <Button
      variant="contained"
      onClick={props.handleOnClick}
      sx={{
        backgroundColor: "#607274",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#9E9FA5",
        },
      }}
    >
      {props.children}
    </Button>
  );
}
