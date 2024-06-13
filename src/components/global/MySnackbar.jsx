import { Alert, Snackbar } from "@mui/material";

export default function MySnackbar({ severity, content, open, handleClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {content}
      </Alert>
    </Snackbar>
  );
}
