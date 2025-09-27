const express = require('express');
const router = express.Router();
const { getAllContacts, getContactById } = require('../controllers/contactsController');

// @route   GET /contacts
// @desc    Get all contacts
// @access  Public
router.get('/', getAllContacts);

// @route   GET /contacts/:id
// @desc    Get single contact by ID
// @access  Public
router.get('/:id', getContactById);

module.exports = router;