import { useState, useEffect } from "react";
import { registerUser } from "../components/api/auth";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(null); // state for logged-in user

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      // Save token for auto-login
      localStorage.setItem("token", res.token);
      setUser(res.user); // immediately set user after registration
    } catch (err) {
      setMsg(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      fetch("http://localhost:5000/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch(() => localStorage.removeItem("token"));
    }
  }, [user]);

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          name='username'
          placeholder='Username'
          value={form.username}
          onChange={handleChange}
        />
        <input
          name='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
        />
        <input
          name='password'
          placeholder='Password'
          type='password'
          value={form.password}
          onChange={handleChange}
        />
        <button type='submit'>Register</button>
      </form>
      {msg && <p>{msg}</p>}
      {user && <p>Logged in as {user.username}</p>}
    </div>
  );
}
