import { useEffect } from "react";
import useApi from "../hooks/useApi";
import { useAuth } from "../contexts/AuthContext";

export default function useEditClass() {
  const { put, data, error, loading } = useApi();
  const { user } = useAuth();

  const editClass = (classId, className, teacherId) => {
    put(
      `/classes/${classId}`,
      {
        name: className,
        teacher_id: teacherId,
      },
      user.sessionId
    );
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return { editClass, data, loading, error };
}
