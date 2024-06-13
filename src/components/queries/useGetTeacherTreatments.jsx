import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";

export default function useGetTeacherTreatments(
  classId,
  teacher_id,
  date,
  revision,
  limit,
  page
) {
  const [treatments, setTreatments] = useState([]);
  const [count, setCount] = useState(0);

  const { get, data, error, loading } = useApi();

  useEffect(() => {
    if (classId || teacher_id || date) {
      get(
        `/treatments?${classId ? `classId=${classId}` : ""}${
          teacher_id ? `&teacher_id=${teacher_id}` : ""
        }${date ? `&date=${date.toISOString()}` : ""}${
          limit ? `&limit=${limit}` : ""
        }${page ? `&page=${page}` : ""}`,
        "",
        true
      );
    }
  }, [classId, teacher_id, date, revision, limit, page]);

  useEffect(() => {
    if (data.message === "success") {
      setTreatments(data.data);
      setCount(data.total);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return { treatments, count, loading, error };
}
