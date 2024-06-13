import { useAuth } from "../contexts/AuthContext";
import useApi from "../hooks/useApi";

export default function useDeleteStudent() {
  const { deleteReq, data, error, loading } = useApi();
  const { user } = useAuth();

  const deleteSt = (id) => {
    deleteReq(`/students/${id}`, {}, user.sessionId);
  };
  return { deleteSt, data, error, loading };
}
