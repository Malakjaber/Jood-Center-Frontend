import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";

export default function useGetRoles() {
  const [roles, setRoles] = useState([]);
  const { get, data, error, loading } = useApi();


  useEffect(() => {
    get(`/roles`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.message === "success") {
      setRoles(data.roles);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return { roles, loading, error };
}
