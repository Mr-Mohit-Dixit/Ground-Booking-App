// src/services/adminAPI.js
const API_ROOT = "http://localhost:5091"; // or your backend URL

export async function getAllUsers() {
  const res = await fetch(`${API_ROOT}/api/admin/users`);
  if (!res.ok) {
    throw new Error(`Error fetching users: ${res.status}`);
  }
  return await res.json();
}
