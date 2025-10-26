const express = require('express');
const router = express.Router();
const DashboardController = require('./dashboardController.js');
const AuthMiddleware = require('./auth.js');

// Apply authentication
router.use(AuthMiddleware.authenticate);

// Get system overview
router.get('/overview', DashboardController.getOverview);

// Get AI performance metrics  
router.get('/ai-performance', DashboardController.getAIPerformance);

// System health check
router.get('/health', DashboardController.getSystemHealth);

module.exports = router;
