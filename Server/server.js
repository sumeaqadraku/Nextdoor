// server.js
const express = require('express');
const app = express();
const port = 3000;

// Import the sequelize instance (and models if needed)
const { sequelize } = require('./src/models');

// Middleware (optional)
app.use(express.json());

// Sync DB
sequelize.sync({ alter: true }) // or { force: true } to reset tables
  .then(() => {
    console.log('✅ Database synced');
  })
  .catch((err) => {
    console.error('❌ Failed to sync DB:', err);
  });

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`🚀 Server is listening at http://localhost:${port}`);
});