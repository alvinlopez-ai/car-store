import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create sample users
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123'
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'password123'
      },
      {
        name: 'Alice Williams',
        email: 'alice@example.com',
        password: 'password123'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users seeded successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
