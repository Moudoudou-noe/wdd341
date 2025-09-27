const Contact = require('../models/Contact');

// Get all contacts
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.getAll();
        
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error('Error in getAllContacts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve contacts',
            message: error.message
        });
    }
};

// Get single contact by ID
const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                error: 'Contact ID is required'
            });
        }

        const contact = await Contact.getById(id);
        
        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error in getContactById:', error);
        
        if (error.message === 'Invalid contact ID format') {
            return res.status(400).json({
                success: false,
                error: 'Invalid contact ID format'
            });
        }
        
        if (error.message === 'Contact not found') {
            return res.status(404).json({
                success: false,
                error: 'Contact not found'
            });
        }
        
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve contact',
            message: error.message
        });
    }
};

module.exports = {
    getAllContacts,
    getContactById
};