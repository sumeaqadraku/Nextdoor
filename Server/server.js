const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
require('dotenv').config();

// Import models
const User = require('./src/models/UserModel');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sync database
sequelize.sync({ force: false })
  .then(() => {
    console.log('✅ Database synced successfully');
    
    // Start server after DB is ready
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error syncing database:', err);
  });
