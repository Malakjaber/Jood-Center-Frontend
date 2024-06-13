import { PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import MyDocument from "../pdf/MyDocument";
import MyPdfViewer from "../pdf/MyPdfViewer";
import SectionNav from "./SectionNav";
import { useEffect } from "react";

export default function ReportSection({ teacherName, studentName, report }) {
  const [instance, updateInstance] = usePDF({ document: MyDocument });

  useEffect(() => {
    updateInstance();
  }, [teacherName, studentName, report, updateInstance]);

  if (!report) {
    return null;
  }

  return (
    <div id="report">
      <SectionNav title={"View Report"}>
        <PDFDownloadLink
          document={
            <MyDocument
              teacherName={teacherName}
              studentName={studentName}
              report={report}
            />
          }
        >
          <img src="/assets/icons/download.png" alt="" />
        </PDFDownloadLink>
      </SectionNav>
      <div className="report flex justify-around py-20">
        <MyPdfViewer>
          <MyDocument
            teacherName={teacherName}
            studentName={studentName}
            report={report}
          />
        </MyPdfViewer>
        <div className="flex flex-col">
          <div className="w-[320px] bg-white rounded-2xl px-7 py-10 mb-[70px]">
            <div className="text-6xl text-green">70%</div>
            <p className="text-[28px] text-[#333] font-light">
              Participants completed all the tasks.
            </p>
          </div>
          <div className="w-[320px] bg-white rounded-2xl px-7 py-10">
            <div className="text-6xl text-green">50%</div>
            <p className="text-[28px] text-[#333] font-light">
              Participants stated that they would like to use Talebook in their
              research.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
