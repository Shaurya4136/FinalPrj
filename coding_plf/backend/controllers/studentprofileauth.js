const Student = require('../models/student'); // Assuming Student model is set up correctly

const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id); // Assuming user ID is available from auth middleware
    if (!student) {
      return res.status(404).json({ error: 'Student not found' }); // Return after sending the response
    }
    return res.json(student); // Return after sending the response to avoid further execution
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ error: 'Failed to fetch profile' }); // Return here as well to prevent any further code execution
  }
};
