 import { useState } from "react";
import { api } from "../api";
import "./Login.css";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/todos";
    } catch (err) {
      alert(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* LEFT PANEL */}
      <div className="login-left">
        <h1>WELCOME</h1>
        <h3>Your Todo App</h3>
        <p>
          Organize your daily tasks, track progress, and stay productive with a
          clean and simple interface.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <h2>Sign in</h2>
        <p className="subtitle">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="User Name"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="link">Forgot Password?</span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="divider">
          <span>Or</span>
        </div>

        <button className="alt-login">Sign in with other</button>

        <p className="switch">
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}
