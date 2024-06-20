import { useFormik } from "formik";
import StudentDetailsForm from "../global/StudentDetailsForm";
import useRoleRedirect from "../hooks/useRoleRedirect";
import { addStudentSchema } from "../validation/Validation";
import useApi from "../hooks/useApi";
import useGetClasses from "../queries/useGetClasses";
import { useEffect, useState } from "react";
import MySnackbar from "../global/MySnackbar";

export default function AddNewStudentPage() {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    severity: "",
    content: "",
  });
  const { put, loading, error, data: addStudentRes } = useApi();

  useRoleRedirect(["co_manager", "manager"]);

  const formik = useFormik({
    initialValues: {
      name: "",
      st_id: "",
      birth_date: "",
      pathological_case: "",
      phone: "",
      address: "",
      medicines: "",
      parent_id: "",
      class_id: 1,
      addSt: true,
    },
    enableReinitialize: true,
    validationSchema: addStudentSchema,
    onSubmit: (values) => {
      console.log(values);
      put(`/students/`, values);
    },
  });

  useEffect(() => {
    if (addStudentRes.message === "success") {
      setSnackbarProps({
        severity: "success",
        content: "Student added successfully",
      });
      setIsSnackbarOpen(true);
    }
  }, [addStudentRes]);

  useEffect(() => {
    if (error) {
      setSnackbarProps({
        severity: "error",
        content: error,
      });
      setIsSnackbarOpen(true);
    }
  }, [error]);

  const { classes } = useGetClasses();

  return (
    <div className="flex justify-around p-12 pb-20">
      <MySnackbar
        {...snackbarProps}
        handleClose={() => setIsSnackbarOpen(false)}
        open={isSnackbarOpen}
      />
      <div className="flex flex-col min-w-[25rem]">
        <h1 className="text-4xl font-Itim mb-8 ">Add new student</h1>
        <StudentDetailsForm
          formik={formik}
          classes={classes}
          loading={loading}
        />
      </div>
      <div className="flex flex-col">
        <img
          className="max-h-[700px]"
          src="/assets/student/student.png"
          alt=""
        />
      </div>
    </div>
  );
}
