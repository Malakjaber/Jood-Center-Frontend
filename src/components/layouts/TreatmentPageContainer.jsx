import React from "react";
import TreatmentSection from "../global/TreatmentSection";
import useGetTreatmentPlan from "../queries/useGetTreatmentPlan";
import { useParams } from "react-router";
import CustomLoader from "../global/CustomLoader";

export default function TreatmentPageContainer() {
  const { id } = useParams();

  const { treatment, loading } = useGetTreatmentPlan(id);

  if (loading) {
    return <CustomLoader />;
  }
  return <TreatmentSection treatmentPlan={treatment} />;
}
