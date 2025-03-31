const express = require('express');
const app = express();

app.use(express.json());

const tasks = [
  { id: 1, title: 'Primera tarea' },
  { id: 2, title: 'Segunda tarea' }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Tarea no encontrada');
  res.json(task);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});

module.exports = app;
