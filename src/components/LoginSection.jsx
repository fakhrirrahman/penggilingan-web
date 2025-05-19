import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.access_token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access_token}`;
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Login gagal, periksa email dan password.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>🚀 Welcome Back</h2>
        <p style={styles.subtitle}>Please log in to your account</p>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="you@example.com"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="********"
          />
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={styles.footerText}>
          Belum punya akun?{" "}
          <a href="#" style={styles.link}>
            Daftar sekarang
          </a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "8px",
    fontSize: "28px",
    color: "#333",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#666",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4F46E5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    textAlign: "center",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
  },
  link: {
    color: "#4F46E5",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default LoginForm;
