const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

const feedbackRouter = require("./routes/feedbackRouter");
const authRouter = require("./routes/authRouter");
const { pageNotFound } = require('./controllers/errors');
const rootDir = require("./utils/pathUtil");


const DB_PATH = "mongodb+srv://Inzamam:Khan786__@completecoding.vqznrfl.mongodb.net/completeCoding?retryWrites=true&w=majority&appName=completeCoding";

const app = express();
const PORT = 3002;

// Session Store using MongoDB
const store = new MongoDBStore({
    uri: DB_PATH,
    collection: 'sessionsLogin'
});

store.on('connected', function () {
    console.log('✅ MongoDB session store connected');
});

store.on('error', function (error) {
    console.error('❌ MongoDB session store error:', error);
});

// EJS View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use(session({
    secret: "KnowledgeGate AI with Complete coding",
    resave: false,
    saveUninitialized: false,
    store: store
}));


app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    next();
});

// Routers
app.use(authRouter);
app.use(feedbackRouter);
app.use(pageNotFound);

// Connect to MongoDB using Mongoose and start the server
mongoose.connect(DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("✅ Connected to MongoDB Atlas via Mongoose");
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
});
