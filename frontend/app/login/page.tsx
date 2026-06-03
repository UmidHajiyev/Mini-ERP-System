"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "@/services/authApi";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setIsLoading(true);

    try {
      const tokens = await loginUser(username, password);

      localStorage.setItem("accessToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);

      router.push("/");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <p className="auth-subtitle">Sign in to manage your inventory system.</p>

        <div className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="primary-button auth-button" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="auth-footer">
          Don&apos;t have an account? <Link href="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}