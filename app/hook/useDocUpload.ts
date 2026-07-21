import { useState } from "react";

const API_URL = "http://localhost:8080/api/documents";

export function useDocUpload() {

    const [extractedText, setExtractedText] = useState<string | null > (null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

async function uploadDoc(file: File) {

    setLoading(true);
    setError(null);
    setExtractedText(null);

    try {

        const token = localStorage.getItem("token");

        if (!token){
            throw new Error("You must be logged in to upload your document.");
        } const formData = new FormData(); //buiilt in obj 
            formData.append("file", file);//key: "file"


        const res = await fetch(`${API_URL}/upload`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, },
            body: formData,
        });

        const data = await res.json();
        
        if (!res.ok) {
        throw new Error(data.error || "Upload failed");
        } setExtractedText(data.extractedText);

        return true;

    } catch (err: any) {

      setError(err.message);
      return false;

    } finally {

      setLoading(false);

    }
  }
   return { uploadDoc, extractedText, error, loading };
}