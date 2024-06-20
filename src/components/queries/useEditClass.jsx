import { useEffect } from "react";
import useApi from "../hooks/useApi";

export default function useEditClass() {
  const { put, data, error, loading } = useApi();

  const editClass = (classId, className, teacherId) => {
    put(
      `/classes/${classId}`,
      {
        name: className,
        teacher_id: teacherId,
      }
    );
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return { editClass, data, loading, error };
}
