import { Sheet, Stack, Typography } from "@mui/joy";
import useGetJoodTeam from "../queries/useGetJoodTeam";
import { useNavigate, useParams } from "react-router";
import useGetClasses from "../queries/useGetClasses";
import CustomLoader from "../global/CustomLoader";
import EditClassForm from "../global/EditClassForm";
import useEditClass from "../queries/useEditClass";
import MySnackbar from "../global/MySnackbar";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

export default function EditClassPageLayout() {
  const { teachers, loading: teachersLoading } = useGetJoodTeam(
    "teachers",
    159,
    1,
    ""
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    severity: "",
    content: "",
  });

  const { editClass, data } = useEditClass();
  const { id } = useParams();
  const navigate = useNavigate();
  const { classes, loading } = useGetClasses(id, true);

  const formik = useFormik({
    initialValues: {
      className: "",
      selectedTeacher: null,
    },
    onSubmit: (values) => {
      const teacherId = values.selectedTeacher
        ? values.selectedTeacher.id
        : null;
      console.log("teacherId: ", teacherId);
      editClass(classes[0].class_id, values.className, teacherId);
    },
  });

  useEffect(() => {
    if (data.message === "success") {
      setSnackbarProps({
        severity: "success",
        content: "Class Edited Successfully",
      });
      setOpenSnackbar(true);
      // setTimeout(() => {
      //   navigate(-1);
      // }, 2000);
    }
  }, [data, navigate]);

  useEffect(() => {
    if (classes.length > 0) {
      const initialTeacher =
        teachers.find((teacher) => teacher.id === classes[0]?.teacher_id) ||
        null;
      formik.setValues({
        className: classes[0]?.className || "",
        selectedTeacher: initialTeacher,
      });
    }
  }, [classes, teachers]);

  if (loading || teachersLoading) {
    return <CustomLoader />;
  }

  if (!classes.length) {
    return (
      <Sheet
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography level="h2" mb={2}>
          Class Not Found!
        </Typography>
        <Typography level="title-lg">Contact us below</Typography>
      </Sheet>
    );
  }

  return (
    <Stack
      sx={{
        p: "5rem",
        display: "flex",
        justifyContent: "center",
        width: "100%",
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
        Edit Class
      </Typography>
      <EditClassForm formik={formik} teachers={teachers} />
    </Stack>
  );
}
