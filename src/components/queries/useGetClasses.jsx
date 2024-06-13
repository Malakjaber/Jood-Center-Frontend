import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";

export default function useGetClasses(classId, isGetDetails, revision) {
  const [classes, setClasses] = useState([]);
  const { get, data, error, loading } = useApi();

  useEffect(() => {
    if (isGetDetails) {
      classId
        ? get(`/classes/details?class_id=${classId}`)
        : get(`/classes/details`, "", true);
    } else {
      get(`/classes/${classId ? classId : ""}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId, isGetDetails, revision]);

  useEffect(() => {
    if (data.message === "success") {
      setClasses(data.data || []);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return { classes, loading, error, setClasses };
}
