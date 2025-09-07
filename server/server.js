// server.js (ES Modules)

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRouter from './routes/auth/auth-routes.js';
import adminProductsRouter from './routes/admin/products-routes.js';
import adminOrderRouter from './routes/admin/order-routes.js';
import shopProductsRouter from './routes/shop/products-routes.js';
import shopCartRouter from './routes/shop/cart-routes.js';
import shopAddressRouter from './routes/shop/address-routes.js';
import shopOrderRouter from './routes/shop/order-routes.js';
import shopSearchRouter from './routes/shop/search-routes.js';
import shopReviewRouter from './routes/shop/review-routes.js';
import commonFeatureRouter from './routes/common/feature-routes.js';

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter);
app.use('/api/common/feature', commonFeatureRouter);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
