

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const itemRoutes = require('./src/routes/itemRoutes');

const app = express();
const PORT = 3000; 

// CORS
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/items', itemRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend berjalan!',
    status: 'OK',
    port: PORT
  });
});

// Start server
app.listen(PORT, () => {
  console.log('=================================');
  console.log('✅ Server: http://localhost:' + PORT);
  console.log('✅ Upload gambar: Enabled');
  console.log('=================================');
});