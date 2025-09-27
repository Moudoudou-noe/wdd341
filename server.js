const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Contacts API',
        version: '1.0.0',
        endpoints: {
            getAllContacts: 'GET /contacts',
            getContactById: 'GET /contacts/:id'
        }
    });
});

app.use('/contacts', contactsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}` 
    });
});

// Connect to MongoDB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Visit: http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});