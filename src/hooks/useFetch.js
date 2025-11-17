import { useState, useEffect } from "react";

const useFetch = (api) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!api) return;

    const controller = new AbortController(); // helps cancel requests on unmount

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(api, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json?.data || json); // fallback to json if no `data` field
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup on unmount or API change
    return () => controller.abort();
  }, [api]);

  return { data, loading, error };
};

export default useFetch;
