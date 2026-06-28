// src/App.jsx
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  // Fetch data from your backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default App;