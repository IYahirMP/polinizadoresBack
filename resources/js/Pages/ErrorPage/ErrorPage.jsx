
import { useRouteError } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import './ErrorPage.css'


export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container max-width='xlg' id="error-page">
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="body1">Lo sentimos, un error inesperado ha ocurrido</Typography>
      <Typography variant="body1">
        <i>{error.statusText || error.message}</i>
      </Typography>
    </Container>
  );
}