import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import { useAuth } from "../contexts/AuthContext";

const useGetReports = (st_id, teacher_id, date, id, limit, page) => {
  const [reports, setReports] = useState([]);
  const [count, setCount] = useState(0);
  const { get, data, error, loading } = useApi();

  useEffect(() => {
    if (st_id || teacher_id || id) {
      get(
        `/reports?${st_id ? `st_id=${st_id}` : ""}${
          teacher_id ? `&teacher_id=${teacher_id}` : ""
        }${date ? `&date=${date.toISOString()}` : ""}${id ? `&id=${id}` : ""}${
          limit ? `&limit=${limit}` : ""
        }${page ? `&page=${page}` : ""}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st_id, teacher_id, date, limit, page]);

  useEffect(() => {
    if (data.message === "success") {
      setReports(data.data);
      setCount(data.total);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return { reports, count, loading, error };
};

export default useGetReports;
