const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const authRoutes = require('./routes/authroutes');
const clubProfileRoutes = require('./routes/clubProfile');
const studentProfileRoutes = require('./routes/Student');
const authenticateToken = require('./middleware/authenticateStudentProfile');

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',                  // Development
  'https://finalprj-qofc.onrender.com'      // Production
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Enables cookies and credentials if needed
}));

app.use(express.json());
app.options('*', cors());

// Connect to MongoDB using Mongoose
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Judge0 API configuration
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// Code execution route
app.post('/', async (req, res) => {
  const { code, language } = req.body;

  const languageMap = {
    python3: 71,
    javascript: 63,
    cpp: 54,
    java: 62,
  };

  const language_id = languageMap[language];

  if (!language_id) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  try {
    const response = await axios.post(
      `${JUDGE0_API_URL}?base64_encoded=false&wait=true`,
      {
        source_code: code,
        language_id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
      }
    );

    const { stdout, stderr } = response.data;
    res.json({ output: stderr || stdout });
  } catch (error) {
    res.status(500).json({ error: 'Failed to execute code' });
  }
});

// Routes
app.use('/auth', authRoutes);
app.use('/api/club-profile', clubProfileRoutes);
app.use('/api/student', authenticateToken, studentProfileRoutes);

// Basic route to test registration
app.post('/auth/register', (req, res) => {
  res.send('User registered successfully');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
