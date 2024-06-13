import { Link } from "react-router-dom";
import StudentDataTable from "../pages/student/StudentDataTable";
import { useParams } from "react-router-dom";
import useGetStudentData from "../queries/useGetStudentData";
import useRoleRedirect from "../hooks/useRoleRedirect";
import ReportSection from "../global/ReportSection";
import { useEffect, useState } from "react";
import Calendar from "../global/Calendar";
import { useAuth } from "../contexts/AuthContext";
import useGetReports from "../queries/useGetReports";
import CustomLoader from "../global/CustomLoader";
import DocsTable from "../global/DocsTable";
import { CircularProgress, Sheet } from "@mui/joy";
import SectionNav from "../global/SectionNav";

const reportsHeadCells = [
  {
    id: "id",
    label: "Id",
  },
  {
    id: "teacherName",
    label: "Teacher",
  },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "content",
    label: "Content",
  },
];

export default function StudentPageLayout() {
  useRoleRedirect(["teacher", "co_manager", "manager"]);
  const { user } = useAuth();
  const { id } = useParams();
  const [reportsLimit, setReportsLimit] = useState(5);
  const [reportsPage, setReportsPage] = useState(1);

  const { studentData, loading } = useGetStudentData(id);
  const {
    reports,
    count: reportsCount,
    loading: reportsLoading,
  } = useGetReports(
    studentData.st_id,
    user?.role === "teacher" ? user?.userId : null,
    null,
    null,
    reportsLimit,
    reportsPage
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [reports, studentData]); // Add `id` dependency to scroll when the route changes

  if (loading || reportsLoading) {
    return <CustomLoader />;
  }

  return (
    <>
      <div className="flex justify-around p-16 min-h-[100vh]">
        <div className="flex flex-col">
          <h1 className="text-4xl font-Itim mb-14">Student Information</h1>
          <StudentDataTable studentData={studentData} />
        </div>
        <div className="flex flex-col">
          <img
            className="max-h-[700px]"
            src="/assets/student/student.png"
            alt=""
          />
          {user.role === "teacher" ? (
            <Link
              className="font-Itim text-xl mt-5 w-fit self-center rounded-xl bg-blue text-white hover:bg-white transition hover:text-blue border hover:border-blue py-2 px-5"
              to={{
                pathname: `/student/createReport/${studentData.st_id}/${studentData.name}`,
                state: { studentName: studentData.name },
              }}
            >
              Create Report
            </Link>
          ) : null}
        </div>
      </div>
      <SectionNav id="reports" title={`${studentData.name} Reports`} />
      {!reportsLoading ? (
        <div className="min-h-[50vh] flex justify-center items-center">
          <DocsTable
            rows={reports}
            headCells={reportsHeadCells}
            cellLinkTo={"report"}
            emptyMsg={"No Reports Found!"}
            setPage={setReportsPage}
            limit={reportsLimit}
            page={reportsPage}
            count={reportsCount}
          />
        </div>
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
      {/* <Calendar
        onCalendarChange={onCalendarChange}
        image={"teacher-calendar.png"}
        date={date}
      /> */}
    </>
  );
}
