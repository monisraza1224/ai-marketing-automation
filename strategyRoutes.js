const express = require('express');
const router = express.Router();
const StrategyController = require('./strategyController.js');
const AuthMiddleware = require('./auth.js');

// Apply authentication
router.use(AuthMiddleware.authenticate);

// Process strategy call transcript
router.post('/process-call', StrategyController.processStrategyCall);

// Quick analysis only
router.post('/quick-analyze', StrategyController.quickAnalyze);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Strategy routes are active',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
