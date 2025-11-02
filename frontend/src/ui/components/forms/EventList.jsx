import { useEffect, useState } from "react";
import { fetchAllEvents, updateEvent, deleteEvent } from "../api/event";
import { jwtDecode } from "jwt-decode"; // ✅ use named import

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });
  const [user, setUser] = useState({ id: null, role: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, role: decoded.role });
        console.log(jwtDecode(localStorage.getItem("token")));
      } catch (err) {
        console.warn("Invalid token");
      }
    }
  }, []);

  useEffect(() => {
    fetchAllEvents()
      .then((data) => setEvents(data.events))
      .catch((err) => setError(err.message));
  }, []);

  const handleEditClick = (event) => {
    setEditingId(event.id);
    setEditData({ title: event.title, content: event.content });
  };

  const handleSave = async (id) => {
    try {
      const updated = await updateEvent(id, editData);
      setEvents((prev) => prev.map((e) => (e.id === id ? updated.event : e)));
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update event:", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Failed to delete event:", err.message);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Events</h1>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {events.map((e) => (
            <li
              key={e.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              {editingId === e.id ? (
                <div>
                  <input
                    type='text'
                    value={editData.title}
                    onChange={(ev) =>
                      setEditData({ ...editData, title: ev.target.value })
                    }
                    placeholder='Title'
                  />
                  <br />
                  <textarea
                    value={editData.content}
                    onChange={(ev) =>
                      setEditData({ ...editData, content: ev.target.value })
                    }
                    placeholder='Content'
                  />
                  <br />
                  <button onClick={() => handleSave(e.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{e.title}</strong>
                  <p>{e.content}</p>

                  {(e.userId === user.id || user.role === "admin") && (
                    <div style={{ marginTop: "0.5rem" }}>
                      {e.userId === user.id && (
                        <button onClick={() => handleEditClick(e)}>Edit</button>
                      )}
                      <button
                        onClick={() => handleDelete(e.id)}
                        style={{ marginLeft: "0.5rem" }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
