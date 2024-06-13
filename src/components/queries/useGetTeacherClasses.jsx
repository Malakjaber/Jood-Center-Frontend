import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";

export default function useGetTeacherClasses(teacherId) {
  const [classes, setClasses] = useState([]);
  const { get, data, error, loading } = useApi();

  useEffect(() => {
    if (teacherId) {
      get(`/teacher-class/${teacherId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId]);

  useEffect(() => {
    if (data.message === "success") {
      setClasses(data.classes);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return { classes, loading, error };
}
