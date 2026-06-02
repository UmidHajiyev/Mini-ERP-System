import type { AuthTokens } from "@/types/auth";

const AUTH_BASE_URL = "http://localhost:8000/api/auth";

export async function loginUser(username: string, password: string) {
  const response = await fetch(`${AUTH_BASE_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data: AuthTokens = await response.json();
  return data;
}

export async function registerUser(username: string, email: string, password: string) {
  const response = await fetch(`${AUTH_BASE_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error("Register failed");
  }

  const data: AuthTokens = await response.json();
  return data;
}