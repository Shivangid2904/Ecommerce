const { MongoClient } = require('mongodb');

let db;
const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME;
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log('DB connected');
};

const getDB = () => db;

module.exports = {
    connectDB,
    getDB,
};