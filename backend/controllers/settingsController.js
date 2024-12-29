const Settings = require("../models/settings");

// Get user settings
const getUserSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ user: req.user._id });
    
    if (!settings) {
      // Create default settings if none exist
      settings = new Settings({ user: req.user._id });
      await settings.save();
    }
    
    res.status(200).json({ settings });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

// Update notification settings
const updateNotificationSettings = async (req, res) => {
  try {
    const { email, sms, appointmentReminders } = req.body;

    const settings = await Settings.findOne({ user: req.user._id });
    if (!settings) {
      return res.status(404).json({ error: "Settings not found" });
    }

    settings.notifications = {
      email: email !== undefined ? email : settings.notifications.email,
      sms: sms !== undefined ? sms : settings.notifications.sms,
      appointmentReminders: appointmentReminders !== undefined 
        ? appointmentReminders 
        : settings.notifications.appointmentReminders,
    };
    settings.updatedAt = Date.now();

    await settings.save();
    res.status(200).json({ 
      message: "Notification settings updated successfully",
      settings 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update notification settings" });
  }
};

// Update preferences
const updatePreferences = async (req, res) => {
  try {
    const { language, theme } = req.body;

    const settings = await Settings.findOne({ user: req.user._id });
    if (!settings) {
      return res.status(404).json({ error: "Settings not found" });
    }

    settings.preferences = {
      language: language || settings.preferences.language,
      theme: theme || settings.preferences.theme,
    };
    settings.updatedAt = Date.now();

    await settings.save();
    res.status(200).json({ 
      message: "Preferences updated successfully",
      settings 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update preferences" });
  }
};

// Update privacy settings
const updatePrivacySettings = async (req, res) => {
  try {
    const { showProfile, showContactInfo } = req.body;

    const settings = await Settings.findOne({ user: req.user._id });
    if (!settings) {
      return res.status(404).json({ error: "Settings not found" });
    }

    settings.privacy = {
      showProfile: showProfile !== undefined ? showProfile : settings.privacy.showProfile,
      showContactInfo: showContactInfo !== undefined ? showContactInfo : settings.privacy.showContactInfo,
    };
    settings.updatedAt = Date.now();

    await settings.save();
    res.status(200).json({ 
      message: "Privacy settings updated successfully",
      settings 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update privacy settings" });
  }
};

module.exports = {
  getUserSettings,
  updateNotificationSettings,
  updatePreferences,
  updatePrivacySettings,
}; 