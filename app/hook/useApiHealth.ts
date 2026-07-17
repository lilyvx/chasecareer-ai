import { useEffect, useState } from "react";

export function useApiHealth() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/health")
      .then((res) => res.json())
      .then((data) => {
        console.log("Spring Backend:", data);
        setStatus(data.status);
      })
      .catch((err) => {
        console.error("Connection failed:", err);
        setError(err.message);
      });
  }, []);

  return { status, error };
}