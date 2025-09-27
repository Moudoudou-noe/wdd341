const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connect');

class Contact {
    constructor(contactData) {
        this.firstName = contactData.firstName;
        this.lastName = contactData.lastName;
        this.email = contactData.email;
        this.favoriteColor = contactData.favoriteColor;
        this.birthday = contactData.birthday;
    }

    // Get all contacts
    static async getAll() {
        try {
            const db = getDB();
            const contacts = await db.collection('contacts').find({}).toArray();
            return contacts;
        } catch (error) {
            throw new Error(`Error fetching contacts: ${error.message}`);
        }
    }

    // Get contact by ID
    static async getById(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('Invalid contact ID format');
            }

            const db = getDB();
            const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
            
            if (!contact) {
                throw new Error('Contact not found');
            }
            
            return contact;
        } catch (error) {
            throw error;
        }
    }

    // Validate contact data
    static validate(contactData) {
        const errors = [];

        if (!contactData.firstName || contactData.firstName.trim() === '') {
            errors.push('First name is required');
        }

        if (!contactData.lastName || contactData.lastName.trim() === '') {
            errors.push('Last name is required');
        }

        if (!contactData.email || contactData.email.trim() === '') {
            errors.push('Email is required');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contactData.email)) {
                errors.push('Invalid email format');
            }
        }

        if (!contactData.favoriteColor || contactData.favoriteColor.trim() === '') {
            errors.push('Favorite color is required');
        }

        if (!contactData.birthday || contactData.birthday.trim() === '') {
            errors.push('Birthday is required');
        }

        return errors;
    }
}

module.exports = Contact;