import { Stack, Typography } from "@mui/joy";
import { useLocation } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  const { message } = location.state || {
    message: "An unknown error occurred",
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center px-10">
      <Stack>
        <Typography sx={{ fontSize: "6rem" }}>Error</Typography>
        <Typography sx={{ fontSize: "2rem" }}>{message}</Typography>
      </Stack>
    </div>
  );
}
