# Backend Track - Notification System

A comprehensive backend notification system built with Node.js and Express.js, featuring vehicle maintenance scheduling and logging capabilities.

## Project Structure

```
2300460100106/
├── logging_middleware/              # HTTP request/response logging
│   └── index.js
├── vehicle_maintence_scheduler/     # Vehicle maintenance task scheduling
│   └── scheduler.js
├── notification_app_be/             # Notification API backend
│   └── server.js
├── notification_system_design.md    # System architecture documentation
├── .gitignore                       # Git ignore file
└── README.md                        # This file
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Application
```bash
node notification_app_be/server.js
```

The server will start on `http://localhost:3000`

## API Endpoints

### Notifications
- `GET /api/notifications` - Get all notifications
- `POST /api/notifications` - Create a new notification
- `PUT /api/notifications/:id` - Mark notification as read
- `DELETE /api/notifications/:id` - Delete a notification
- `GET /health` - Health check

## Modules

### 1. Logging Middleware
Handles request and response logging for all HTTP operations.

### 2. Vehicle Maintenance Scheduler
Manages scheduling and tracking of vehicle maintenance tasks.

### 3. Notification App Backend
REST API for creating, retrieving, and managing notifications.

## Documentation

See `notification_system_design.md` for detailed architecture, API specifications, and design patterns.

## License

Proprietary
