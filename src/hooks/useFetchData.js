import React, { useState, useEffect } from "react";

const useFetchData = (url, options, id, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const constructURL = (url, id, params) => {
    let urlWithParams = url;
    if (id) {
      urlWithParams += `/${id}`;
    }
    if (params) {
      const queryString = Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join("&");
      if (queryString) {
        urlWithParams += `?${queryString}`;
      }
    }
    return urlWithParams;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const constructedURL = constructURL(url, id, params);
        const mergedOptions = { ...defaultOptions, ...options };

        const response = await fetch(constructedURL, mergedOptions);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();

    return () => fetchData();
  }, [url, id, params, options]);

  return { data, loading, error };
};

export default useFetchData;
