import { Link } from "react-router-dom";
import SectionNav from "../global/SectionNav";
import StudentsTable from "../global/students/StudentsTable";
import DebouncedInput from "../global/DebouncedInput";
import { CircularProgress, Sheet, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import useGetStudents from "../queries/useGetStudents";
import useDeleteStudent from "../queries/useDeleteStudent";
import MySnackbar from "../global/MySnackbar";
import CustomLoader from "../global/CustomLoader";

export default function StudentsSectionContainer({ editable }) {
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { getRole, user } = useAuth();
  const role = getRole();

  const studentsLimit = 12;
  const { students, count, loading, error, setStudents } = useGetStudents(
    user?.userId,
    role,
    studentsLimit,
    page,
    searchTerm,
    revision
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    severity: "",
    content: "",
  });

  const {
    deleteSt,
    data: deleteStResponse,
    loading: deleteLoading,
  } = useDeleteStudent();

  useEffect(() => {
    if (deleteStResponse?.message === "success") {
      if (students.length === 1) {
        setPage((oldPage) => --oldPage);
      }
      setSnackbarProps({
        severity: "success",
        content: "Student Removed Successfully",
      });
      setOpenSnackbar(true);
      setRevision((rev) => rev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteStResponse, setStudents]);

  useEffect(() => {
    if (error) {
      setSnackbarProps({
        severity: "error",
        content: error,
      });
      setOpenSnackbar(true);
    }
  }, [error]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleRemoveStudent = (studentId) => {
    deleteSt(studentId);
  };

  if (deleteLoading) {
    return <CustomLoader />;
  }
  return (
    <div id="students" className="border-t-2 border-t-lightgray pb-8 mb-20">
      <MySnackbar
        open={openSnackbar}
        {...snackbarProps}
        handleClose={() => setOpenSnackbar(false)}
      />
      <div className="mb-20">
        <SectionNav title={"Student Table"}>
          <div className="flex items-center relative">
            <img
              className="w-5 absolute ml-2"
              src="/assets/icons/search.png"
              alt=""
            />
            <DebouncedInput
              isDisabled={!students.length && !searchTerm}
              handleSearch={handleSearch}
              placeholder="Search for student"
            />
          </div>
          {role === "co_manager" || role === "manager" ? (
            <Link
              to={"/add-student"}
              className="border-2 border-white px-2 py-[0.1rem] rounded-md font-Itim text-lg"
            >
              Add new student
            </Link>
          ) : null}
        </SectionNav>
      </div>
      {!loading ? (
        students.length ? (
          <StudentsTable
            handlePageChange={handlePageChange}
            studentsLimit={studentsLimit}
            students={students}
            editable={editable}
            page={page}
            count={count}
            handleRemoveStudent={handleRemoveStudent}
          />
        ) : (
          <Sheet
            sx={{
              minHeight: "40vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
            }}
          >
            <Typography level="h4">No students found!</Typography>
          </Sheet>
        )
      ) : (
        <Sheet
          sx={{
            width: "100vw",
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress variant="solid" color="neutral" />
        </Sheet>
      )}
    </div>
  );
}
