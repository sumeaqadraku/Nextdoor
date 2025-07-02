const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./src/models'); 
const path = require("path");
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json());
app.use(cookieParser());

const userRoutes = require('./src/routes/Users');
const authRoutes = require('./src/routes/Auth');``
const propertyRoutes = require('./src/routes/Properties');
const notificationRoutes = require('./src/routes/Notifications');
const appointmentRoutes = require('./src/routes/Appointments');
const agentRoutes = require('./src/routes/Agent');
const savedRoutes = require('./src/routes/Saved');
const requestRoutes = require('./src/routes/Requests');
const buyerRoutes = require('./src/routes/Buyer');
const adminRoutes = require('./src/routes/Admin');
const reviewRoutes = require('./src/routes/Reviews');
const ligjeratatRoutes = require('./src/routes/Ligjeratat');

require('dotenv').config();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/properties', propertyRoutes); 
app.use('/api/appointments', appointmentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/ligjeratat', ligjeratatRoutes);

const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  
});
