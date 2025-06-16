const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.post("/api/items", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/api/items`);
});
