import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";

export default function useGetStudentByParent(parentId) {
  const [student, setStudent] = useState({});
  const { get, data, error, loading } = useApi();

  useEffect(() => {
    get(`/students?limit=1&parentId=${parentId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);

  useEffect(() => {
    if (data.message === "success") {
      const students = data.students;
      setStudent(students[0]);
    }
  }, [data]);

  return { student, loading, error };
}
