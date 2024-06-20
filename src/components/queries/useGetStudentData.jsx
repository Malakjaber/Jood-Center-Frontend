import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import { useAuth } from "../contexts/AuthContext";

const useGetStudentData = (studentId) => {
  const [studentData, setStudentData] = useState({});
  const { get, data, error, loading } = useApi();

  useEffect(() => {
    if (!studentId) return;
    get(`/students/${studentId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  useEffect(() => {
    if (data.message === "success") {
      setStudentData(data.student);
    }
  }, [data]);

  return { studentData, loading, error };
};

export default useGetStudentData;
