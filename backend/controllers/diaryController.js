 
const DiaryEntry = require('../models/DiaryEntry');

// @desc    Create a new diary entry
// @route   POST /api/diary
// @access  Public (can add auth later)
const createEntry = async (req, res) => {
  try {
    const { title, content, mood } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newEntry = new DiaryEntry({
      title,
      content,
      mood,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all diary entries
// @route   GET /api/diary
// @access  Public
const getAllEntries = async (req, res) => {
  try {
    const entries = await DiaryEntry.find().sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createEntry,
  getAllEntries,
};
