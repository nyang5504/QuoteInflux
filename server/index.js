require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const userRoutes = require('./routes');

// const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.yg6dtnq.mongodb.net/quoteinflux`;
const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.yg6dtnq.mongodb.net/quoteinflux`;

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Use user routes
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
