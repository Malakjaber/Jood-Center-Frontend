import { useState, useEffect } from "react";
import useApi from "../hooks/useApi"; // Adjust the path as needed to where useApi is located

export default function useGetStudents(
  userId,
  role,
  limit = 12,
  page,
  searchTerm,
  revision
) {
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);

  const { get, data, loading, error } = useApi();

  useEffect(() => {
    if (userId && role === "teacher") {
      get(
        `/students/teacher/${userId}?limit=${limit}&page=${page}&search=${searchTerm}`
      );
    } else {
      get(
        `/students?limit=${limit}&page=${page}&search=${searchTerm}`,
        "",
        true
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, page, searchTerm, limit, role, revision]);

  useEffect(() => {
    if (data?.message === "success") {
      setStudents(data.students);
      setCount(data.count);
    }
  }, [data]);

  return {
    students,
    count,
    loading,
    error,
    setStudents,
  };
}
