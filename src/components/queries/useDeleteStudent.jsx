import useApi from "../hooks/useApi";

export default function useDeleteStudent() {
  const { deleteReq, data, error, loading } = useApi();

  const deleteSt = (id) => {
    deleteReq(`/students/${id}`);
  };
  return { deleteSt, data, error, loading };
}
