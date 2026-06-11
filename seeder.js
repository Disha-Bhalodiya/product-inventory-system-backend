import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

// Load environmental parameters
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'Apple iPhone 15 Pro with Titanium design and A17 Pro chip.',
    quantity: 25,
    categories: ['Electronics', 'Mobile'],
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Wireless industry-leading noise-canceling headphones.',
    quantity: 15,
    categories: ['Electronics', 'Audio'],
  },
  {
    name: 'MacBook Pro 14-inch',
    description: 'Apple MacBook Pro with M3 chip and liquid retina XDR display.',
    quantity: 10,
    categories: ['Electronics', 'Laptops'],
  },
  {
    name: 'JavaScript: The Good Parts',
    description: 'Unearthing the beautiful, highly expressive language elements of JS.',
    quantity: 50,
    categories: ['Books', 'Business'],
  },
  {
    name: 'Classic Running Shoes',
    description: 'Breathable and lightweight mesh running shoes.',
    quantity: 40,
    categories: ['Clothing', 'Footwear'],
  },
  {
    name: 'Premium Leather Jacket',
    description: 'Handcrafted genuine leather jacket with sleek modern fit.',
    quantity: 12,
    categories: ['Clothing'],
  },
  {
    name: 'Studio Condenser Microphone',
    description: 'Professional XLR studio condenser microphone for recording and streaming.',
    quantity: 8,
    categories: ['Electronics', 'Audio'],
  }
];

const importData = async () => {
  try {
    // Clear existing products
    await Product.deleteMany();
    console.log('Existing products cleared.');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products and categories successfully seeded to the database!');
    process.exit(0);
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data destroyed!');
    process.exit(0);
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Simple command line router
const runSeeder = async () => {
  await connectDB();
  if (process.argv[2] === '-d') {
    await destroyData();
  } else {
    await importData();
  }
};

runSeeder();
