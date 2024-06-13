import { useEffect } from "react";
import useApi from "../hooks/useApi";
import { useAuth } from "../contexts/AuthContext";

const useEditStudent = () => {
  const { put, data, error, loading } = useApi();

  const { user } = useAuth();

  const editStudent = (studentData) => {
    put("/student", studentData, user.sessionId);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return { editStudent, data, loading, error };
};

export default useEditStudent;
