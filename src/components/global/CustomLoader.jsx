import { Sheet } from "@mui/joy";
import CircularProgress from "@mui/joy/CircularProgress";
import React from "react";

export default function CustomLoader() {
  return (
    <Sheet
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress variant="solid" color="neutral" />
    </Sheet>
  );
}
