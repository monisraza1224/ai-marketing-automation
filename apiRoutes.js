const express = require('express');
const router = express.Router();

// Import route modules from ROOT folder
const webhookRoutes = require('./webhookRoutes.js');
const contentRoutes = require('./contentRoutes.js');
const strategyRoutes = require('./strategyRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

// API version prefix
const API_PREFIX = '/api/v1';

// Mount routes
router.use(`${API_PREFIX}/webhooks`, webhookRoutes);
router.use(`${API_PREFIX}/content`, contentRoutes);
router.use(`${API_PREFIX}/strategy`, strategyRoutes);
router.use(`${API_PREFIX}/dashboard`, dashboardRoutes);

// API health check
router.get(`${API_PREFIX}/health`, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'AI Marketing Automation API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API documentation endpoint
router.get(`${API_PREFIX}/docs`, (req, res) => {
  res.json({
    name: 'AI Marketing Automation API',
    description: 'AI-powered marketing automation system',
    version: '1.0.0',
    endpoints: {
      webhooks: `${API_PREFIX}/webhooks`,
      content: `${API_PREFIX}/content`,
      strategy: `${API_PREFIX}/strategy`,
      dashboard: `${API_PREFIX}/dashboard`
    }
  });
});

module.exports = router;
