import { Button, Stack, Typography } from "@mui/joy";
import Home from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
export default function ErrorBoundary() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center  px-10">
      <Stack spacing={2}>
        <Typography sx={{ fontSize: "6rem" }}>404</Typography>
        <Typography sx={{ fontSize: "2rem", maxWidth: "30rem" }}>
          Oh, You lost!
          <br />
          <Typography sx={{ fontSize: "1.6rem" }}>
            The page you are looking for does not exist. How you got here is a
            mystery.
          </Typography>
        </Typography>
        <Link to={"/"} className=" self-end max-w-40">
          <Button startDecorator={<Home />}>Back Home</Button>
        </Link>
      </Stack>
    </div>
  );
}
