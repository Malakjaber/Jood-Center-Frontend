import { useEffect } from "react";
import useApi from "../hooks/useApi";
import { useAuth } from "../contexts/AuthContext";

export default function useCreateClass() {
  const { post, data, error, loading } = useApi();
  const { user } = useAuth();
  const createClass = (className, teacherId) => {
    post(
      "/classes/",
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

  return { createClass, data, loading, error };
}
