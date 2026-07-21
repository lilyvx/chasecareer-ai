import { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/api/documents";

export function useLatestDocument() {
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestDocument() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Log in to view this page.");
        }

        const res = await fetch(`${API_URL}/latest`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Could not load your resume data.");
        }

        setExtractedText(data.extractedText);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestDocument();
  }, []);

  return { extractedText, error, loading };
}