const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./src/models'); 
const cors = require('cors');
app.use(cors())
app.use(express.json());
app.use(cookieParser());

const userRoutes = require('./src/routes/Users');
const authRoutes = require('./src/routes/Auth');
const propertyRoutes = require('./src/routes/Properties');
const notificationRoutes = require('./src/routes/Notifications');
const appointmentRoutes = require('./src/routes/Appointments');
const agentRoutes = require('./src/routes/Agent');
const savedRoutes = require('./src/routes/Saved');
require('dotenv').config();

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/agents', agentRoutes);
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
