// server.js
const express = require('express');
const app = express();
const port = 3000;


const { sequelize } = require('./src/models');


app.use(express.json());

// Sync DB
sequelize.sync({ alter: true })
  .then(() => {
    console.log('DB synced');
  })
  .catch((err) => {
    console.error('Failed to sync DB:', err);
  });

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});