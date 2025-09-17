// routes/contacts.js
// Ici on crée les routes GET (getAll, getOne)

const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// GET ALL contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await req.db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des contacts' });
  }
});

// GET ONE contact par ID
router.get('/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id); // Convertit string → ObjectId
    const contact = await req.db.collection('contacts').findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({ error: 'Contact non trouvé' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du contact' });
  }
});

module.exports = router;