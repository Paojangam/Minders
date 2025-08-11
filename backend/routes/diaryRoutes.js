const express = require('express');
const router = express.Router();

const authenticateUser = require('../middleware/auth'); // ✅ import middleware

const {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntryById,
  deleteEntryById
} = require('../controllers/diaryController');

// ✅ Use authenticateUser middleware to protect routes
router.post('/', authenticateUser, createEntry);
router.get('/', authenticateUser, getAllEntries);
router.get('/:id', authenticateUser, getEntryById);
router.put('/:id', authenticateUser, updateEntryById);
router.delete('/:id', authenticateUser, deleteEntryById);

module.exports = router;
