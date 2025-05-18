const db = require('./src/models');

const express = require('express');
const app = express();

db.sequelize.sync({ alter: true }) // or { force: true } for full drop & recreate
  .then(() => {
    console.log('Database synced successfully ✅');
  })
  .catch(err => {
    console.error('Failed to sync database ❌', err);
  });


app.use(express.json());

// Import routes
const userRoutes = require('./src/routes/Users');

const propertyRoutes = require('./src/routes/Properties');
// Use routes
app.use('/api/users', userRoutes);


app.listen(3000, () => {
  console.log('Server running on port 3000');
});


const router = express.Router();



// Use property routes under /api/properties
app.use('/api/properties', propertyRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});


module.exports = router;