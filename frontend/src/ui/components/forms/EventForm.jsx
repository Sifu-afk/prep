import { useState } from "react";
import { createEvent } from "../api/event";

export default function EventForm() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await createEvent(form);
      setMsg(res.event ? `Event "${res.event.title}" created!` : "Event created");
      setForm({ title: "", content: "" });
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
