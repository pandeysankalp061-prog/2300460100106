require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const Log = require('../logging_middleware/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Startup Logging
async function startServer() {
    try {
        await Log("backend", "info", "server", "Vehicle Maintenance Scheduler application is starting up");

        console.log(`🚀 Server running on http://localhost:${PORT}`);

        await Log("backend", "info", "server", `Server successfully started on port ${PORT}`);
    } catch (err) {
        console.error("Startup error:", err.message);
    }
}

startServer();

// Routes
app.get('/', async (req, res) => {
    await Log("backend", "info", "route", "Root endpoint accessed");
    res.json({
        message: "Vehicle Maintenance Scheduler API is running!",
        status: "active"
    });
});

app.get('/health', async (req, res) => {
    await Log("backend", "info", "route", "Health check endpoint accessed");
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString()
    });
});

// Example Vehicle Route
app.get('/vehicles', async (req, res) => {
    await Log("backend", "info", "controller", "GET /vehicles endpoint called");
    res.json({
        message: "Vehicle list endpoint (to be implemented)",
        vehicles: []
    });
});

app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}`);
});