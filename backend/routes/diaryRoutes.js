 
const express = require('express');
const router = express.Router();

const { createEntry, getAllEntries } = require('../controllers/diaryController');

// POST - Create a new diary entry
router.post('/', createEntry);

// GET - Get all diary entries
router.get('/', getAllEntries);

module.exports = router;
