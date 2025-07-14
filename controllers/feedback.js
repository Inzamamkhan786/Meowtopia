const Feedback = require('../models/feedback');


// controllers/feedbackController.js
exports.postfeedback = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect("/login"); // 🔒 redirect if not logged in
    }

    const { descrp } = req.body;

    const feedback = new Feedback({
        descrp,
        userId: req.session.user._id,
    });

    feedback.save()
        .then(() => {
            console.log("✅ Feedback saved successfully");
            res.redirect("/"); // back to home
        })
        .catch(err => {
            console.error("❌ Error saving feedback:", err);
            res.status(500).send("Something went wrong.");
        });
};






exports.getfeedbackList = (req, res, next) => {
    Feedback.find()
        .then(registeredFeedback => {
            res.render('feedbackSubmitted', {
                registeredFeedback: registeredFeedback,
                pageTitle: 'Feedback List',
                currentPage: 'Feedback List',
                isLoggedIn: req.isLoggedIn
            });
        })
        .catch(err => {
            console.error('❌ Error fetching feedback:', err);
            res.status(500).send("Failed to load feedback.");
        });
};


exports.getHome = (req, res) => {
    res.render('index2', {
      isLoggedIn: req.session.isLoggedIn || false
    });
  };
  