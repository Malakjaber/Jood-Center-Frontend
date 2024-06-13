import { useAuth } from "../contexts/AuthContext";
import useApi from "../hooks/useApi";

export default function useDeleteClass() {
  const { deleteReq, data, error, loading } = useApi();
  const { user } = useAuth();

  const deleteClass = (id) => {
    deleteReq(`/classes/${id}`, {}, user.sessionId);
  };

  return { deleteClass, data, error, loading };
}
