const { MongoClient } = require('mongodb');

async function checkMongoDB() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const dbName = 'futurelabs';

    console.log('Checking MongoDB connection...');
    console.log('URI:', uri);

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('✅ Connected successfully to MongoDB server');

        const db = client.db(dbName);
        const collections = await db.listCollections().toArray();

        console.log(`✅ Database "${dbName}" is accessible`);
        console.log('Available collections:', collections.map(c => c.name));

        await client.close();
        return true;
    } catch (error) {
        console.log('❌ Failed to connect to MongoDB:', error.message);

        if (error.message.includes('ECONNREFUSED')) {
            console.log('\nTroubleshooting tips:');
            console.log('1. Make sure MongoDB is installed and running');
            console.log('2. Check if MongoDB is running on the default port (27017)');
            console.log('3. Verify your MONGODB_URI in the backend .env file');
            console.log('4. On Windows, you can start MongoDB with: net start MongoDB');
            console.log('5. On macOS/Linux, you can start MongoDB with: sudo systemctl start mongod');
        }

        return false;
    }
}

// Run the check
checkMongoDB().then(() => {
    console.log('\nMongoDB check completed.');
});