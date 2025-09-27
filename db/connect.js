const { MongoClient } = require('mongodb');

let db;
let client;

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not defined');
        }

        console.log('Connecting to MongoDB...');
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        
        // Test the connection
        await client.db().admin().ping();
        console.log('Successfully connected to MongoDB!');
        
        // Get database instance
        db = client.db('contactsdb');
        
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
};

const closeDB = async () => {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
};

module.exports = {
    connectDB,
    getDB,
    closeDB
};