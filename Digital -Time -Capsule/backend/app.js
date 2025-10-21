require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
require('./config/passport');

const capsuleRoutes = require('./routes/capsuleRoutes');
const authRoutes = require('./routes/authRoutes');
const analyticsRoutes = require('./routes/analytics');

const startCronJob = require('./utils/cronJob');

const app = express();

// Start scheduled jobs (e.g., reminder notifications)
startCronJob();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json()); // Replaces body-parser

// Add session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret", // Use a secure secret in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Initialize Passport and restore authentication state, if any
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/capsule', capsuleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);

// Optional: Catch-all route or error handler can go here

module.exports = app;
