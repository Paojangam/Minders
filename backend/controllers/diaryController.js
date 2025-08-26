const DiaryEntry = require('../models/DiaryEntry');
const analyzeMood = require('../models/analyzeMood');  // import your AI mood detection function

// @desc    Create a new diary entry with AI mood detection
// @route   POST /api/diary
// @access  Public (can add auth later)
const createEntry = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user?.userId; // safely access userId

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Detect mood from content using AI
    const mood = await analyzeMood(content);
    console.log('Mood detected on create:', mood);

    const newEntry = new DiaryEntry({ title, content, mood, userId });
    const savedEntry = await newEntry.save();

    console.log('Saved entry:', savedEntry);

    res.status(201).json(savedEntry);
  } catch (error) {
    console.error('Error creating diary entry:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all diary entries for user
// @route   GET /api/diary
// @access  Public
const getAllEntries = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const entries = await DiaryEntry.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error getting diary entries:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get a single entry by ID
// @route   GET /api/diary/:id
// @access  Public
const getEntryById = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const entry = await DiaryEntry.findOne({ _id: req.params.id, userId }); // 👈 filter by both
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error('Error getting entry by ID:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a diary entry by ID with AI mood detection
// @route   PUT /api/diary/:id
// @access  Public
const updateEntryById = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const mood = await analyzeMood(content);

    const updatedEntry = await DiaryEntry.findOneAndUpdate(
      { _id: req.params.id, userId },  // 👈 filter by owner
      { title, content, mood },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found or not yours' });
    }

    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error('Error updating diary entry:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a diary entry by ID
// @route   DELETE /api/diary/:id
// @access  Public
const deleteEntryById = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const deletedEntry = await DiaryEntry.findOneAndDelete({
      _id: req.params.id,
      userId
    });

    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found or not yours' });
    }

    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting diary entry:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


module.exports = {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntryById,
  deleteEntryById,
};
