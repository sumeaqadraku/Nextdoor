const express = require('express');
const app = express();

const db = require('./src/models');

app.use(express.json());

// Sync Sequelize
db.sequelize.sync({ alter: true }).then(() => {
  console.log('DB synced');
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
});