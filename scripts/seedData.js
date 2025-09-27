const { connectDB, closeDB } = require('../db/connect');

const sampleContacts = [
    {
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean.dupont@email.com",
        favoriteColor: "Bleu",
        birthday: "1990-05-15"
    },
    {
        firstName: "Marie",
        lastName: "Martin",
        email: "marie.martin@email.com",
        favoriteColor: "Rouge",
        birthday: "1985-08-22"
    },
    {
        firstName: "Pierre",
        lastName: "Bernard",
        email: "pierre.bernard@email.com",
        favoriteColor: "Vert",
        birthday: "1992-12-03"
    },
    {
        firstName: "Sophie",
        lastName: "Leroy",
        email: "sophie.leroy@email.com",
        favoriteColor: "Violet",
        birthday: "1988-03-18"
    },
    {
        firstName: "Alexandre",
        lastName: "Moreau",
        email: "alexandre.moreau@email.com",
        favoriteColor: "Orange",
        birthday: "1995-07-10"
    }
];

const seedDatabase = async () => {
    try {
        console.log('Starting database seeding...');
        
        const db = await connectDB();
        const collection = db.collection('contacts');
        
        // Clear existing data
        await collection.deleteMany({});
        console.log('Cleared existing contacts');
        
        // Insert sample data
        const result = await collection.insertMany(sampleContacts);
        console.log(`Successfully inserted ${result.insertedCount} contacts`);
        
        // Verify data was inserted
        const count = await collection.countDocuments();
        console.log(`Total contacts in database: ${count}`);
        
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await closeDB();
        console.log('Database seeding completed');
        process.exit(0);
    }
};

seedDatabase();