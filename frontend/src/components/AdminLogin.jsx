import { useState } from "react";
import axios from "axios";
import "./admin.css"; // optional, I will create for you

export default function AdminLogin({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const login = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", form);

      // Save token to browser
      localStorage.setItem("adminToken", res.data.token);

      onSuccess(); // redirect to dashboard
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={login} className="admin-card">
        <h2>Admin Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}
