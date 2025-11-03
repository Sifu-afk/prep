import { useState } from "react";
import { loginUser } from "../components/api/auth";
import styled from "styled-components";

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
    <Container>
      <form onSubmit={handleSubmit}>
        <Label>
          <h1>Login</h1>
        </Label>
        <Label>
          Email
          <StyledInput
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Password
          <StyledInput
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </Label>
        <StyledButton type="submit">Login</StyledButton>
      </form>
      {msg && <p>{msg}</p>}
    </Container>
  );
}

const Container = styled.div`
  min-height: 80vh;
  max-width: 25rem;
  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: 0.25rem;
  width: 100%;
  max-width: 20rem;
`;

const StyledButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  max-width: 20rem;
  transition: background-color 0.2s ease, transform 0.1s ease;
  text-align: center;

  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #005fcc;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
    transform: none;
  }
`;
