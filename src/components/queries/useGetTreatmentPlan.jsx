import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";

export default function useGetTreatmentPlan(id, classId, teacher_id, date) {
  const [treatment, setTreatment] = useState({});
  const { get, data, error, loading } = useApi();

  useEffect(() => {
    if (classId || id) {
      get(
        `/treatments?${id ? `id=${id}` : ""}${
          classId ? `classId=${classId}` : ""
        }${teacher_id ? `&teacher_id=${teacher_id}` : ""}${
          date ? `&date=${date.toISOString()}` : ""
        }`
      );
    }
  }, [classId, teacher_id, date, id]);

  useEffect(() => {
    if (data.message === "success") {
      setTreatment(data.data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return { treatment, loading, error };
}
