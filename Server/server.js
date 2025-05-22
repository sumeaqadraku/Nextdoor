const express = require('express');
const app = express();
const db = require('./src/models'); 
const cors = require('cors');
app.use(cors())
app.use(express.json());

const userRoutes = require('./src/routes/Users');
const propertyRoutes = require('./src/routes/Properties');
const notificationRoutes = require('./src/routes/Notifications');
const appointmentRoutes = require('./src/routes/Appointments');
require('dotenv').config();




app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes); 
app.use('/api/appointments', appointmentRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});


