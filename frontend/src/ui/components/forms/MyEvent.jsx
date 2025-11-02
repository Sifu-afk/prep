import { useEffect, useState } from "react";
import { fetchMyEvents, updateEvent, deleteEvent } from "../api/event";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchMyEvents();
        setEvents(res.events);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEditClick = (event) => {
    setEditingId(event.id);
    setEditData({ title: event.title, content: event.content });
  };

  const handleSave = async (id) => {
    try {
      const updated = await updateEvent(id, editData);
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? updated.event : e))
      );
      setEditingId(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>My Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((ev) => (
          <div key={ev.id} style={{ marginBottom: "1rem" }}>
            {editingId === ev.id ? (
              <div>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  placeholder="Title"
                />
                <br />
                <textarea
                  value={editData.content}
                  onChange={(e) =>
                    setEditData({ ...editData, content: e.target.value })
                  }
                  placeholder="Content"
                />
                <br />
                <button onClick={() => handleSave(ev.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{ev.title}</h3>
                <p>{ev.content}</p>
                <button onClick={() => handleEditClick(ev)}>Edit</button>
                <button onClick={() => handleDelete(ev.id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
