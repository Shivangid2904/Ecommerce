require('dotenv').config();
const { connectDB } = require('./config/db');
const { getDB } = require('./config/db');

const run = async () => {
  try {
    await connectDB();

    const sampleUsers = [
      { name: 'Seed User One', email: 'seed.user1@example.com', password: 'password123' },
      { name: 'Seed User Two', email: 'seed.user2@example.com', password: 'password123' }
    ];

    const sampleProducts = [
      {
        name: 'Sample Product A',
        description: 'Description for product A',
        price: 19.99,
        category: 'Category A',
        stock: 10,
        image: '/images/productA.jpg',
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sample Product B',
        description: 'Description for product B',
        price: 29.99,
        category: 'Category B',
        stock: 5,
        image: '/images/productB.jpg',
        rating: 4.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    const db = getDB();

    // Insert users
    const users = db.collection('users');
    const usersResult = await users.insertMany(sampleUsers);
    console.log('Inserted users count:', usersResult.insertedCount);
    console.log('Inserted user ids:', usersResult.insertedIds);

    // Insert products
    const products = db.collection('products');
    const productsResult = await products.insertMany(sampleProducts);
    console.log('Inserted products count:', productsResult.insertedCount);
    console.log('Inserted product ids:', productsResult.insertedIds);

    // Show one inserted user and product
    const createdUser = await users.findOne({ _id: usersResult.insertedIds[0] });
    const createdProduct = await products.findOne({ _id: productsResult.insertedIds[0] });
    console.log('Example created user:');
    console.log(createdUser);
    console.log('Example created product:');
    console.log(createdProduct);

    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

run();
