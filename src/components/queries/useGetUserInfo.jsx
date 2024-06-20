import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";

export default function useGetUserInfo(id) {
  const [user, setUser] = useState({});
  const { get, data, error, loading } = useApi();

  useEffect(() => {
    if (!id) return;
    get(`/users/${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data.message === "success") {
      setUser(data.user);
    }
  }, [data]);

  return { user, loading, error };
}
