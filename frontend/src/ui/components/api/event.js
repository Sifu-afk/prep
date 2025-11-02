const API_URL = "http://localhost:5000/api/v1/event";

export async function createEvent(data) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create event");
  }

  return res.json();
}

export async function fetchAllEvents() {
  const res = await fetch(`${API_URL}/all`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch events");
  }
  return res.json();
}

export async function fetchMyEvents() {
  const token = localStorage.getItem("token");
  console.log(localStorage.getItem("token"));

  const res = await fetch(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch my events");
  }

  return res.json();
}

export async function updateEvent(id, data) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update event");
  return res.json();
}

export async function deleteEvent(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete event");
  return res.json();
}
