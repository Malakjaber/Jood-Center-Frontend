import { PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import SectionNav from "./SectionNav";
import MyDocument from "../pdf/MyDocument";
import MyPdfViewer from "../pdf/MyPdfViewer";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function TreatmentSection({ treatmentPlan }) {
  const { user } = useAuth();
  const [instance, updateInstance] = usePDF({ document: MyDocument });

  useEffect(() => {
    updateInstance();
  }, [treatmentPlan, updateInstance]);

  if (!treatmentPlan) {
    return null;
  }
  return (
    <div id="treatment">
      <SectionNav title={"Read Treatment Plans"}>
        <PDFDownloadLink
          document={
            <MyDocument
              teacherName={treatmentPlan.teacherName}
              type={"treatment"}
              treatmentPlan={treatmentPlan}
            />
          }
        >
          <img src="/assets/icons/download.png" alt="" />
        </PDFDownloadLink>
      </SectionNav>
      <div className="report flex justify-around py-20">
        <MyPdfViewer>
          <MyDocument
            teacherName={treatmentPlan.teacherName}
            type={"treatment"}
            treatmentPlan={treatmentPlan}
          />
        </MyPdfViewer>
      </div>
    </div>
  );
}
