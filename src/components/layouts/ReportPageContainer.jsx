import React from "react";
import ReportSection from "../global/ReportSection";
import { useAuth } from "../contexts/AuthContext";
import useGetStudentByParent from "../queries/useGetStudentByParent";
import useGetReports from "../queries/useGetReports";
import CustomLoader from "../global/CustomLoader";
import { useParams } from "react-router";

export default function ReportPageContainer() {
  const { user } = useAuth();
  const { id } = useParams();

  const { student } = useGetStudentByParent(user?.userId);

  const { reports, loading } = useGetReports(
    student?.st_id,
    null,
    null,
    id
    // selectedDate
  );

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div>
      <ReportSection
        teacherName={reports[0]?.teacherName}
        studentName={student?.name}
        report={reports[0]}
      />
    </div>
  );
}
