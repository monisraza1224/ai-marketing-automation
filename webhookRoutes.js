const express = require('express');
const router = express.Router();
const WebhookController = require('./webhookController.js');
const UploadMiddleware = require('./upload.js');

// GHL Webhook endpoint
router.post('/ghl', WebhookController.handleGHLWebhook);

// Strategy call transcript upload
router.post(
  '/upload-transcript', 
  UploadMiddleware.single,
  UploadMiddleware.cleanupOnError,
  WebhookController.handleStrategyCallUpload
);

// Fireflies.ai webhook endpoint
router.post('/fireflies', WebhookController.handleFirefliesWebhook);

// Slack notifications endpoint
router.post('/slack', WebhookController.handleSlackNotification);

// Lead engagement webhook
router.post('/lead-engagement', WebhookController.handleLeadEngagement);

// New contact webhook
router.post('/new-contact', WebhookController.handleNewContact);

// Test webhook endpoint
router.post('/test', (req, res) => {
  const testData = {
    contactId: 'test_contact_123',
    locationId: process.env.GHL_LOCATION_ID,
    eventType: 'email_opened',
    eventData: { emailId: 'test_email_456' }
  };
  
  WebhookController.handleLeadEngagement({ body: testData }, res);
});

// Health check for webhooks
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Webhook routes are active',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
