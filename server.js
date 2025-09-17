// server.js
//  Point d’entrée du serveur Express

const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config(); // Charge le fichier .env

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour lire du JSON
app.use(express.json());

// Connexion MongoDB
let db;
MongoClient.connect(process.env.MONGODB_URI)
  .then(client => {
    console.log(' Connecté à MongoDB Atlas');
    db = client.db(); // On prend la DB définie dans l’URI
  })
  .catch(err => console.error(err));

// Routes
const contactsRoutes = require('./routes/contacts');
app.use('/contacts', (req, res, next) => {
  req.db = db; // On passe la db dans la requête pour les routes
  next();
}, contactsRoutes);

// Route test
app.get('/', (req, res) => {
  res.send('Hello World  - Contacts API');
});

// Lancement serveur
app.listen(port, () => {
  console.log(` Serveur en cours sur http://localhost:${port}`);
});