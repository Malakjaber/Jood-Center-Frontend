import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";

export default function useGetTeacherInfo(id) {
  const [teacher, setTeacher] = useState({});
  const { get, data, error, loading } = useApi();

  useEffect(() => {
    if (id) get(`/users/${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data.message === "success") {
      setTeacher(data.teacher);
    }
  }, [data]);

  return { teacher, loading, error };
}
