import { useState, useEffect } from "react";
import useApi from "../hooks/useApi"; // Adjust the path as needed to where useApi is located

export default function useGetJoodTeam(
  position,
  limit = 12,
  page,
  searchTerm,
  id
) {
  const [teachers, setTeachers] = useState([]);
  const [coManagers, setCoManagers] = useState([]);
  const [count, setCount] = useState(0);

  const { get, data, loading, error } = useApi();

  useEffect(() => {
    if (position === "teachers") {
      get(
        `/teachers?limit=${limit}&page=${page}&search=${searchTerm}`,
        "",
        true
      );
    } else {
      get(
        `/co_managers?limit=${limit || ""}&page=${page || ""}&search=${
          searchTerm || ""
        }&id=${id || ""}`,
        "",
        true
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm, limit, position]);

  useEffect(() => {
    if (data?.message === "success") {
      setTeachers(data.teachers);
      setCoManagers(data.co_managers);
      setCount(data.count);
    }
  }, [data]);

  return {
    teachers,
    coManagers,
    count,
    loading,
    error,
  };
}
