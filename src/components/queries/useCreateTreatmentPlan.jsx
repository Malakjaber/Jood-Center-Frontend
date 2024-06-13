import { useEffect } from "react";
import useApi from "../hooks/useApi";
import { useAuth } from "../contexts/AuthContext";

const useCreateTreatmentPlan = () => {
  const { post, data, error, loading } = useApi();

  const { user } = useAuth();

  const createTreatment = (class_id, content) => {
    post("/treatments/", {
      date: new Date().toISOString(),
      teacher_id: user?.userId,
      class_id: class_id,
      content: content,
    });
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return { createTreatment, data, loading, error };
};

export default useCreateTreatmentPlan;
