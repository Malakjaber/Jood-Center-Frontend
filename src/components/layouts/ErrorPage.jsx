import { Button, Typography, Stack } from "@mui/joy";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography level="h2" sx={{ mb: 2 }}>
        404 - Page Not Found
      </Typography>
      <Typography level="body1" sx={{ mb: 3 }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button component={Link} to="/" variant="solid" sx={{ mt: 2 }}>
        Go Home
      </Button>
    </Stack>
  );
}
