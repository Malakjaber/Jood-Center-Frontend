import useApi from "../hooks/useApi";

export default function useDeleteClass() {
  const { deleteReq, data, error, loading } = useApi();

  const deleteClass = (id) => {
    deleteReq(`/classes/${id}`);
  };

  return { deleteClass, data, error, loading };
}
