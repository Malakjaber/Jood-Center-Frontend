import { Link } from "react-router-dom";
import StudentDataTable from "../pages/student/StudentDataTable";
import { useParams } from "react-router-dom";
import useGetStudentData from "../queries/useGetStudentData";
import useRoleRedirect from "../hooks/useRoleRedirect";
import ReportSection from "../global/ReportSection";
import { useState } from "react";
import Calendar from "../global/Calendar";
import { useAuth } from "../contexts/AuthContext";
import useGetReports from "../queries/useGetReports";
import CustomLoader from "../global/CustomLoader";

export default function StudentPageLayout() {
  const { user } = useAuth();
  const { id } = useParams();
  const [date, setDate] = useState(new Date());
  const { studentData, loading } = useGetStudentData(id);
  const { reports, loading: reportsLoading } = useGetReports(
    studentData.st_id,
    user?.userId,
    date
  );

  useRoleRedirect(["teacher", "co_manager", "manager"]);

  if (loading || reportsLoading) {
    return <CustomLoader />;
  }

  const onCalendarChange = (event) => {
    setDate(event.value);
  };

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
      <Calendar
        onCalendarChange={onCalendarChange}
        image={"teacher-calendar.png"}
        date={date}
      />
      <ReportSection
        teacherName={user.username}
        studentName={studentData.name}
        date={date}
        report={reports[0]}
      />
    </>
  );
}
