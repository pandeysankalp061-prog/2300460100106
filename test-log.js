import Log from './index.js';

async function test() {
    console.log("🚀 Testing Logging Middleware...");

    await Log("backend", "info", "middleware", "Logging middleware initialized successfully");
    await Log("backend", "warn", "service", "This is a warning message for testing");
    await Log("backend", "error", "handler", "Sample error: Invalid input data received");
    await Log("backend", "info", "server", "Test log from middleware package");
}

test();