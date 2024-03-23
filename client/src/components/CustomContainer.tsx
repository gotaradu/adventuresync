import Container from "@mui/material/Container";
export default function CustomContainer(props: any) {
  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {props.children}
    </Container>
  );
}
