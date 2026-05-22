import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios.js";

export default function RegistrationPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerUserOperation = async (formData) => {
    try {
      setError("");
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("All fields are required!");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }
    registerUserOperation(form);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} style={{ padding: "8px" }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ padding: "8px" }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={{ padding: "8px" }} />
        <button type="submit" style={{ padding: "10px", background: "#fc842c", color: "white", border: "none", cursor: "pointer" }}>Register</button>
        <button type="button" onClick={() => navigate("/login")} style={{ padding: "10px", background: "#ccc", border: "none", cursor: "pointer" }}>Log In</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
