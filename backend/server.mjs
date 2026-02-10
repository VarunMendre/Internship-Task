import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

// Load env vars
dotenv.config();

// Import DB connection
import './config/db.js';

// Import Route Files
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';

// Import Middleware
import errorHandler from './middleware/errorMiddleware.js';

// Initialize App
const app = express();

// --- Standard Middleware ---
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));

// --- Security Middleware ---
app.use(helmet()); // Set security HTTP headers
app.use(cors());   // Enable CORS

// --- Logging (Development) ---
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// --- Mount Routes ---
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/owner', ownerRoutes);

// --- Error Handling Middleware ---
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`❌ Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
