import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function useApi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});
  const navigate = useNavigate();

  const fetchData = async (
    path,
    method = "GET",
    body = {},
    token = "",
    force
  ) => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        method,
        url: "https://jood-center-backend.onrender.com" + path,
        // url: "http://localhost:3001" + path,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: body,
      };
      if (method !== "GET" || !cache[path] || force) {
        const response = await axios(config);
        const result = response.data;
        // Cache the data
        if (!force) {
          setCache((prevCache) => ({
            ...prevCache,
            [path]: result,
          }));
        }
        setData(result);
      } else {
        setData(cache[path]);
        setLoading(false);
        return;
      }
    } catch (err) {
      let errMsg = "An error occured!";
      if (err?.response?.data?.error) {
        errMsg = err.response.data.error;
      }
      setError(errMsg);
      setLoading(false);
      // navigate("/error", { state: { message: errMsg } });
    } finally {
      setLoading(false);
    }
  };

  const get = (url, token, force) => fetchData(url, "GET", {}, token, force);
  const post = (url, body, token) => fetchData(url, "POST", body, token);

  const deleteReq = (url, body, token) => fetchData(url, "DELETE", body, token);
  const put = (url, body, token) => fetchData(url, "PUT", body, token);

  return { data, loading, error, get, post, deleteReq, put };
}
