import Container from "@mui/material/Container";
export default function CustomContainer(props: any) {
  return (
    <Container
      maxWidth={false}
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: props.background || "none",
      }}
    >
      {props.children}
    </Container>
  );
}
