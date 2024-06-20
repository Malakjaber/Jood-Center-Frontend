import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Typography,
} from "@mui/joy";
import Stack from "@mui/joy/Stack";
import useGetJoodTeam from "../queries/useGetJoodTeam";
import CustomLoader from "../global/CustomLoader";
import { useEffect, useState } from "react";
import useCreateClass from "../queries/useCreateClass";
import { useFormik } from "formik";
import { createClassSchema } from "../validation/Validation";
import MySnackbar from "../global/MySnackbar";

export default function CreateClassPageLayout() {
  const { users: teachers, loading } = useGetJoodTeam("teacher", 159, 1);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    severity: "",
    content: "",
  });

  const { createClass, data, error } = useCreateClass();

  useEffect(() => {
    if (teachers && teachers.length > 0) {
      setSelectedTeacherId(teachers[0].userId);
    }
  }, [teachers]);

  useEffect(() => {
    if (data?.message === "success") {
      setSnackbarProps({
        severity: "success",
        content: "Class Created Successfully",
      });
      setOpenSnackbar(true);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setSnackbarProps({
        severity: "error",
        content: error,
      });
      setOpenSnackbar(true);
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      className: "",
      selectedTeacher: null,
    },
    validationSchema: createClassSchema,
    onSubmit: (values) => {
      createClass(values.className, values.selectedTeacher?.id);
    },
  });

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <Stack
      sx={{
        p: "5rem",
      }}
    >
      <MySnackbar
        {...snackbarProps}
        open={openSnackbar}
        handleClose={() => {
          setOpenSnackbar(false);
        }}
      />
      <Typography
        level="h2"
        sx={{ fontFamily: "Itim", fontWeight: 500, mb: "3rem" }}
      >
        Create New Class
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container columns={1} rowGap={3}>
          <Grid xs={12}>
            <FormControl
              error={formik.touched.className && formik.errors.className}
            >
              <FormLabel>Class Name</FormLabel>
              <Input
                size="lg"
                placeholder="Class Name"
                sx={{ width: 300 }}
                {...formik.getFieldProps("className")}
                required
              />
              {formik.touched.className && formik.errors.className ? (
                <FormHelperText>{formik.errors.className}.</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl>
              <FormLabel>Select Teacher</FormLabel>
              <Autocomplete
                size="lg"
                placeholder="Select Teacher"
                value={formik.values.selectedTeacher}
                onChange={(event, newValue) => {
                  formik.setFieldValue("selectedTeacher", newValue);
                }}
                inputValue={formik.values.selectedTeacher?.username || ""}
                onInputChange={(event, newInputValue) => {
                  formik.setFieldValue("selectedTeacher", {
                    ...formik.values.selectedTeacher,
                    username: newInputValue,
                  });
                }}
                getOptionLabel={(option) => option.username || ""}
                options={teachers}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <Input {...params} placeholder="Select Teacher" required />
                )}
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <Button size="lg" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
}
