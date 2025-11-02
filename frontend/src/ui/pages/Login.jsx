import { useState } from "react";
import { loginUser } from "../components/api/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      setMsg(res.message || "Logged in!");
      localStorage.setItem("token", res.token);
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type='submit'>Login</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
