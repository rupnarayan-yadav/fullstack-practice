// backend/index.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());           // allows React to talk to this server
app.use(express.json());   // lets us read JSON from requests

// In-memory data (no database needed for assessment)
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

// GET all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET single user
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
});

// POST - create user
app.post("/api/users", (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - update user
app.put("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Not found" });
  user.name = req.body.name;
  res.json(user);
});

// DELETE user
app.delete("/api/users/:id", (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));