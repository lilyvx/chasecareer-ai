import { useState } from "react";

const API_URL = "http://localhost:8080/api/auth";

export function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function register(username: string, email: string, password: string) {

    setLoading(true);
    setError(null);

    try {

      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      localStorage.setItem("token", data.token);
      return true;
    } 
    catch (err: any) {

      setError(err.message);
      return false;

    } finally {

      setLoading(false);

    }
  }

  async function login(username: string, password: string) {
    
    setLoading(true);
    setError(null);
    try {

      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),

      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("token", data.token);
      return true;
    } 
    catch (err: any) {

      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { register, login, error, loading };
}