import { useState, useEffect } from "react";
import useApi from "../hooks/useApi"; // Adjust the path as needed to where useApi is located
import { useAuth } from "../contexts/AuthContext";

export default function useGetJoodTeam(role, limit = 12, page) {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  const { get, data, loading, error } = useApi();

  useEffect(() => {
    get(`/users?role=${role}&limit=${limit}&page=${page}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, role]);

  useEffect(() => {
    if (data?.message === "success") {
      setUsers(data.users);
      setCount(data.count);
    }
  }, [data]);

  return {
    users,
    count,
    loading,
    error,
  };
}
