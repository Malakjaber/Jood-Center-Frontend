import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";

export default function useGetStudentTreatments(st_id, limit, page) {
  const [treatments, setTreatments] = useState({});
  const [count, setCount] = useState(0);

  const { get, data, error, loading } = useApi();

  useEffect(() => {
    if (st_id) {
      get(
        `/treatments/student-treatments?studentId=${st_id}${
          limit ? `&limit=${limit}` : ""
        }${page ? `&page=${page}` : ""}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st_id]);

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
