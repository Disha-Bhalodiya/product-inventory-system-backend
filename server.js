import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/db.js';

// Load environmental parameters
dotenv.config();

// Establish database link
connectDB();

const PORT = process.env.PORT || 7000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections gracefully
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
