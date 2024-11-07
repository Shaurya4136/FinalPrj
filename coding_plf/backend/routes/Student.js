// backend/routes/studentProfile.js
const express = require('express');
const router = express.Router();
const StudentProfile = require('../models/student'); // Assuming this is your StudentProfile model
const authenticateToken = require('../middleware/authenticateStudentProfile'); // Your authentication middleware

// Get student profile (with automatic creation if it doesn't exist)
router.get('/profile', authenticateToken, async (req, res) => {
  console.log('Fetching profile for userId:', req.user.id);
  try {
    if (!req.user || !req.user.id) {
      console.error('UserId not found in request.');
      return res.status(400).json({ message: 'UserId not found in request.' });
    }

    let profile = await StudentProfile.findOne({ userId: req.user.id });

    if (!profile) {
      console.log('Profile not found, creating a new one.');
      profile = new StudentProfile({
        userId: req.user.id,
        name: '',        // Default or placeholder values
        email: '',       // Populate as necessary
        bio: '',
        avatar: '',
        skills: [],
      });
      await profile.save();
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching or creating profile:', error);
    res.status(500).json({ message: 'Error fetching or creating profile', error });
  }
});

// Update student profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, email, bio, avatar, skills } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and Email are required fields.' });
    }

    let profile = await StudentProfile.findOne({ userId: req.user.id });

    if (!profile) {
      console.log('Creating a new profile as it does not exist.');
      profile = new StudentProfile({
        userId: req.user.id,
        name,
        email,
        bio,
        avatar,
        skills,
      });
    } else {
      profile.name = name;
      profile.email = email;
      profile.bio = bio;
      profile.avatar = avatar;
      profile.skills = skills;
    }

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

module.exports = router;
