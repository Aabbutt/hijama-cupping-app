const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");
const { jwtParse } = require("../middleware/auth");

// All routes are protected with JWT authentication
router.use(jwtParse);

// Get user settings
router.get("/", settingsController.getUserSettings);

// Update notification settings
router.put("/notifications", settingsController.updateNotificationSettings);

// Update preferences
router.put("/preferences", settingsController.updatePreferences);

// Update privacy settings
router.put("/privacy", settingsController.updatePrivacySettings);

module.exports = router; 