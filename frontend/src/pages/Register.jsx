 import { useState } from "react";
import { useNavigate } from "react-router-dom";   // 👈 ADD THIS
import { api } from "../api";
import "./Register.css";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();                 // 👈 ADD THIS

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await api.post("/auth/register", { email, password });

      alert("Account created successfully. Please login.");

      // ✅ PROPER REDIRECT (NO PAGE RELOAD)
      navigate("/"); // login page
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Continue planning your tasks</p>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Input email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              required
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="link">Forgot your password?</span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="divider">
          <span>Or</span>
        </div>

        {/* SOCIAL LOGIN UI ONLY */}
        <button className="social google">
          <img src="https://img.icons8.com/color/24/google-logo.png" />
          Sign up with Google
        </button>

        <button className="social apple">
          <img src="https://img.icons8.com/ios-filled/24/ffffff/mac-os.png" />
          Sign up with Apple
        </button>

        <button className="social facebook">
          <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook.png" />
          Sign up with Facebook
        </button>

        <p className="switch">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}
