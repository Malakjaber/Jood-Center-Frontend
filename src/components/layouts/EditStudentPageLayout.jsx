import { useFormik } from "formik";
import useRoleRedirect from "../hooks/useRoleRedirect";
import { useParams } from "react-router";
import useGetStudentData from "../queries/useGetStudentData";
import useGetClasses from "../queries/useGetClasses";
import { editStudentSchema } from "../validation/Validation";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import MySnackbar from "../global/MySnackbar";
import StudentDetailsForm from "../global/StudentDetailsForm";
import CustomLoader from "../global/CustomLoader";

export default function EditStudentPageLayout() {
  const {
    put,
    data: editStudentRes,
    loading: editStudentLoading,
    error,
  } = useApi();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    severity: "",
    content: "",
  });

  useRoleRedirect(["co_manager", "manager"]);
  const { id } = useParams();
  const { studentData, loading } = useGetStudentData(id);
  const {
    name,
    st_id,
    birth_date,
    address,
    medicines,
    phone,
    pathological_case,
    userId: parent_id,
    class_id,
  } = studentData;

  const formik = useFormik({
    initialValues: {
      name: name || "",
      birth_date: birth_date || "",
      pathological_case: pathological_case || "",
      phone: phone || "",
      address: address || "",
      medicines: medicines || "",
      parent_id: parent_id || "",
      class_id: class_id || 1,
    },
    enableReinitialize: true,
    validationSchema: editStudentSchema,
    onSubmit: (values) => {
      put(
        `/students/${st_id}`,
        { ...values, userId: values.parent_id },
      );
    },
  });

  useEffect(() => {
    if (editStudentRes.message === "success") {
      setSnackbarProps({
        severity: "success",
        content: "Student Edited Successfully",
      });
      setOpenSnackbar(true);
    }
  }, [editStudentRes]);

  useEffect(() => {
    if (error) {
      setSnackbarProps({
        severity: "error",
        content: error,
      });
      setOpenSnackbar(true);
    }
  }, [error]);

  const { classes } = useGetClasses();
  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="flex justify-around p-16">
      <MySnackbar
        {...snackbarProps}
        open={openSnackbar}
        handleClose={() => {
          setOpenSnackbar(false);
        }}
      />
      <div className="flex flex-col min-w-[25rem]">
        <h1 className="text-4xl font-Itim mb-8">EDit Student Information</h1>
        <StudentDetailsForm
          formik={formik}
          classes={classes}
          loading={editStudentLoading}
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
