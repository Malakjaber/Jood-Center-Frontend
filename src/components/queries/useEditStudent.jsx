import { useEffect } from "react";
import useApi from "../hooks/useApi";

const useEditStudent = () => {
  const { put, data, error, loading } = useApi();

  const editStudent = (studentData) => {
    put("/student", studentData);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return { editStudent, data, loading, error };
};

export default useEditStudent;
