const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

require('./models');

sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database & tables synced!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
})