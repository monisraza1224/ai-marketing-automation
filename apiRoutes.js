const express = require('express');
const router = express.Router();

// Import route modules
const webhookRoutes = require('./webhookRoutes');
const contentRoutes = require('./contentRoutes');
const strategyRoutes = require('./strategyRoutes');
const dashboardRoutes = require('./dashboardRoutes');

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
    timestamp: new Date().toISOString(),
    endpoints: {
      webhooks: `${API_PREFIX}/webhooks`,
      content: `${API_PREFIX}/content`,
      strategy: `${API_PREFIX}/strategy`,
      dashboard: `${API_PREFIX}/dashboard`
    }
  });
});

// API documentation endpoint
router.get(`${API_PREFIX}/docs`, (req, res) => {
  res.json({
    name: 'AI Marketing Automation API',
    description: 'AI-powered marketing automation system',
    version: '1.0.0',
    endpoints: {
      webhooks: {
        'POST /webhooks/ghl': 'Process GHL webhooks',
        'POST /webhooks/upload-transcript': 'Upload strategy call transcripts',
        'POST /webhooks/fireflies': 'Process Fireflies.ai webhooks',
        'POST /webhooks/slack': 'Send Slack notifications',
        'POST /webhooks/lead-engagement': 'Process lead engagement',
        'POST /webhooks/new-contact': 'Process new contacts'
      },
      content: {
        'POST /content/generate': 'Generate AI content',
        'POST /content/campaign': 'Generate campaign content',
        'POST /content/suggestions': 'Get content suggestions',
        'POST /content/documents': 'Generate client documents'
      },
      strategy: {
        'POST /strategy/process-call': 'Process strategy call transcripts',
        'POST /strategy/quick-analyze': 'Quick transcript analysis'
      },
      dashboard: {
        'GET /dashboard/overview': 'Get system overview',
        'GET /dashboard/ai-performance': 'Get AI performance metrics',
        'GET /dashboard/health': 'System health check'
      }
    }
  });
});

module.exports = router;
