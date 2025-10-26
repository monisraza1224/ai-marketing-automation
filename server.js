const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes from ROOT folder
const apiRoutes = require('./apiRoutes.js');
const ErrorHandler = require('./errorHandler.js');
const Logger = require('./logger.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use(apiRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'AI Marketing Automation Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to AI Marketing Automation System',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/v1',
      docs: '/api/v1/docs'
    }
  });
});

// Error handling middleware (must be last)
app.use(ErrorHandler.handleNotFound);
app.use(ErrorHandler.handleError);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
