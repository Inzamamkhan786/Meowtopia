//core module
const path = require('path');


//external module
const express = require('express');
const feedbackRouter = express.Router();
const rootDir = require("../utils/pathUtil");
const getHome = require('../controllers/feedback');
const feedbackController = require('../controllers/feedback');




feedbackRouter.post("/submit-feedback", feedbackController.postfeedback);
feedbackRouter.get("/", feedbackController.getHome); // Optional view page
feedbackRouter.get("/submit-feedback", feedbackController.getfeedbackList);

module.exports = feedbackRouter;