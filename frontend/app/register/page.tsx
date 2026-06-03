"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "@/services/authApi";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    setError("");
    setIsLoading(true);

    try {
      const tokens = await registerUser(username, email, password);

      router.push("/");
    } catch {
      setError("Could not create account.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Register to start managing your inventory.</p>

        <div className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button className="primary-button auth-button" onClick={handleRegister} disabled={isLoading}>
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </div>

        <p className="auth-footer">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}