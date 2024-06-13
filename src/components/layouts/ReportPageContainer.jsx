import ReportSection from "../global/ReportSection";
import useGetReports from "../queries/useGetReports";
import CustomLoader from "../global/CustomLoader";
import { useParams } from "react-router";

export default function ReportPageContainer() {
  const { id } = useParams();

  const { reports, loading } = useGetReports(null, null, null, id);

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div>
      <ReportSection
        teacherName={reports[0]?.teacherName}
        studentName={reports[0]?.studentName}
        report={reports[0]}
      />
    </div>
  );
}
