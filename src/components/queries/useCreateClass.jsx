import { useEffect } from "react";
import useApi from "../hooks/useApi";

export default function useCreateClass() {
  const { post, data, error, loading } = useApi();
  const createClass = (className, teacherId) => {
    post("/classes/", {
      name: className,
      teacher_id: teacherId,
    });
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return { createClass, data, loading, error };
}
