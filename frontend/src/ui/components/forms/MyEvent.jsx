import { useEffect, useState } from "react";
import { fetchMyEvents, updateEvent, deleteEvent } from "../api/event";
import styled from "styled-components";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
    category: "",
    address: "",
    date: "",
  });

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
      console.error(err.message);
    }
  };

  return (
    <Container>
      <h2>My Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((ev) => (
          <div key={ev.id} style={{ marginBottom: "1rem" }}>
            {editingId === ev.id ? (
              <div>
                <Input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  placeholder="Title"
                />
                <br />
                <Textarea
                  value={editData.content}
                  onChange={(e) =>
                    setEditData({ ...editData, content: e.target.value })
                  }
                  placeholder="Content"
                />
                <Textarea
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                  placeholder="Category"
                />
                <Textarea
                  value={editData.address}
                  onChange={(e) =>
                    setEditData({ ...editData, address: e.target.value })
                  }
                  placeholder="Address"
                />
                <Textarea
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                  placeholder="Date"
                />
                <br />
                <StyledButton onClick={() => handleSave(ev.id)}>
                  Save
                </StyledButton>
                <StyledButton onClick={() => setEditingId(null)}>
                  Cancel
                </StyledButton>
              </div>
            ) : (
              <List>
                <ListItem>{ev.title}</ListItem>
                <ListItem>{ev.content}</ListItem>
                <ListItem>{ev.category}</ListItem>
                <ListItem>{ev.address}</ListItem>
                <ListItem>{ev.date}</ListItem>

                <StyledButton onClick={() => handleEditClick(ev)}>
                  Edit
                </StyledButton>
                <StyledButton onClick={() => handleDelete(ev.id)}>
                  Delete
                </StyledButton>
              </List>
            )}
          </div>
        ))
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
