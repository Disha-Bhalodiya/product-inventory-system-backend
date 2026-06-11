import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Mount point
app.use('/api/products', productRoutes);

// Fallback Route handler for 404s
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
