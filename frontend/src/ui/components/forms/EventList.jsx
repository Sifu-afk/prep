import { useEffect, useState } from "react";
import { fetchAllEvents, updateEvent, deleteEvent } from "../api/event";
import { jwtDecode } from "jwt-decode";
import styled from "styled-components";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
    category: "",
    address: "",
    date: "",
  });
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
    setEditData({
      title: event.title,
      content: event.content,
      category: event.address,
      address: event.address,
      date: event.date,
    });
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
    <Container>
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
                  <Input
                    type="text"
                    value={editData.title}
                    onChange={(ev) =>
                      setEditData({ ...editData, title: ev.target.value })
                    }
                    placeholder="Title"
                  />
                  <br />
                  <Textarea
                    value={editData.content}
                    onChange={(ev) =>
                      setEditData({ ...editData, content: ev.target.value })
                    }
                    placeholder="Content"
                  />
                  <Textarea
                    value={editData.category}
                    onChange={(ev) =>
                      setEditData({ ...editData, category: ev.target.value })
                    }
                    placeholder="Category"
                  />
                  <Textarea
                    value={editData.address}
                    onChange={(ev) =>
                      setEditData({ ...editData, address: ev.target.value })
                    }
                    placeholder="Address"
                  />
                  <Textarea
                    value={editData.date}
                    onChange={(ev) =>
                      setEditData({ ...editData, date: ev.target.value })
                    }
                    placeholder="Date"
                  />
                  <br />
                  <button onClick={() => handleSave(e.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <List>
                  <ListItem>{e.title}</ListItem>
                  <ListItem>{e.content}</ListItem>
                  <ListItem>{e.category}</ListItem>
                  <ListItem>{e.address}</ListItem>
                  <ListItem>{e.date}</ListItem>
                  <img src={`${e.image}`} alt="image" />

                  {(e.userId === user.id || user.role === "admin") && (
                    <div style={{ marginTop: "0.5rem" }}>
                      {e.userId === user.id && (
                        <StyledButton onClick={() => handleEditClick(e)}>Edit</StyledButton>
                      )}
                      <StyledButton
                        onClick={() => handleDelete(e.id)}
                        style={{ marginLeft: "0.5rem" }}
                      >
                        Delete
                      </StyledButton>
                    </div>
                  )}
                </List>
              )}
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
`;

const List = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
`;

const ListItem = styled.p`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  background: #1a1a1a;
  transition: background 0.2s ease;

  &:hover {
    background: #272727;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #333;
  background: #1a1a1a;
  color: #fff;
  outline: none;

  &:focus {
    border-color: #00aaff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #333;
  background: #1a1a1a;
  color: #fff;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: #00aaff;
  }
`;

const StyledButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.secondary ? "#a0a0a0" : "#007bff")};
  color: white;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.secondary ? "#888" : "#005fcc")};
  }
`;
