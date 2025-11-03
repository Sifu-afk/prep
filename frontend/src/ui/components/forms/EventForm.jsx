import { useState } from "react";
import { createEvent } from "../api/event";
import styled from "styled-components";

export default function EventForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    address: "",
    image: "",
    date: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await createEvent(form);
      setMsg(
        res.event ? `Event "${res.event.title}" created!` : "Event created"
      );
      setForm({ title: "", content: "" });
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <Container>
      {msg && <p>{msg}</p>}
      <FormBox onSubmit={handleSubmit}>
        <h1>Create Event</h1>
        <Label>
          Title
          <InputFull
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Content
          <InputFull
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
            required
          />
        </Label>

        <Label>
          category
          <InputFull
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Adress
          <InputFull
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Image
          <InputFull
            name="image"
            placeholder="Image"
            type="url"
            value={form.image}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Date
          <InputFull
            name="date"
            placeholder="Date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </Label>
        <StyledButton type="submit">Post</StyledButton>
      </FormBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: 100%;
`;

const FormBox = styled.form`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EditorWrapper = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const InputFull = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #333;
  border-radius: 5px;
  background: #1a1a1a;
  color: #fff;
  box-sizing: border-box;

  &:focus {
    border-color: #00aaff;
  }
`;

const StyledButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  width: 100%;
  align-self: center;
  background-color: #007bff;
  color: white;
  text-align: center;

  &:hover {
    background-color: #005fcc;
    transform: translateY(-1px);
  }
`;
