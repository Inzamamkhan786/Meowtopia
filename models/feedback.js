const mongoose = require('mongoose');

// Create a schema
const FeedbackSchema = new mongoose.Schema({
  descrp: {
    type: String,
    required: true,
  },
});

// Create and export the model
module.exports = mongoose.model('Feedback', FeedbackSchema);
